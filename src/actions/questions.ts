"use server";

import QuestionModel, {
  BaseQuestion,
  QuestionDocument,
} from "@/models/question";
import connectToDB from "@/utilities/connectToDB";

import path from "path";
import fs from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import sharp from "sharp";
import { notFound, redirect } from "next/navigation";
import { FilterQuery } from "mongoose";
import getObjectUrl from "@/utilities/getObjectUrl";
import { PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechInput } from "@aws-sdk/client-polly";
import storage from "@/lib/Storage";




const pollyClient = new PollyClient({
  region: process.env.REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

async function addAudio(question:QuestionDocument){
  const input: SynthesizeSpeechInput = {
    OutputFormat: "mp3",
    Text: question.text,
    VoiceId: "Hala",
    Engine: "neural",
    LanguageCode: "ar-AE",
  };

  const synthesizeSpeechCommand = new SynthesizeSpeechCommand(input);

  const pollyResponse = await pollyClient.send(synthesizeSpeechCommand);

  const key = `audios/${Date.now().toString(36)}.mp3`;

  await storage.putStreamObject({
    key,
    stream: pollyResponse.AudioStream?.transformToWebStream()!
  })





  question.audio = key;
}


async function handleFontTracingPlaceholder(question:QuestionDocument,placeholder:ArrayBuffer){

  const width = 300;
  const height = 300;
  const buffer = await sharp(placeholder).resize(width, height,{fit: "fill"}).raw().toBuffer();
  const result = Buffer.alloc(width * height * 3,255);
  const points:Coordinate[] = []
  for(let x = 0; x < width; x += 4) {
      for(let y = 0; y < height; y += 4) {
          if(buffer[(x + y * width) * 4 + 3] < 100)  continue;
          const index = (x + y * width) * 3;
          result[index] = 0;
          result[index + 1] = 0;
          result[index + 2] = 0;

          points.push(new Coordinate(x,y));

      }
  }

  let centersCount = Math.floor(points.length * .1);


  points.sort(() => Math.random() - .5);


  const centers:Coordinate[] = [];



  for(let i = 0;i < centersCount;i++){
      centers.push(points[i].clone());
  }


  const maxPoints = Math.ceil(points.length / centersCount);

 



  



  for(let n = 0;n < 10;n++){

      const sum = Array(centersCount * 2).fill(0)
      const count = Array(centersCount).fill(0);

      for(let point of points){
          let index = -1;
          let minDistance = Number.MAX_SAFE_INTEGER;

          for(let i = 0;i < centersCount;i++){
              if(count[i] == maxPoints) continue;
              const distance = Math.sqrt(Math.pow(point.x - centers[i].x,2) + Math.pow(point.y - centers[i].y,2));
              if(distance > minDistance) continue;
              index = i;
              minDistance = distance;
    
          }

          sum[index * 2] += point.x;
          sum[index * 2 + 1] += point.y;
          count[index]++;
          
      }

      
      for(let i = 0;i < centersCount;i++){
        
          if(count[i] != 0){
              centers[i].x = Math.floor(sum[i * 2] / count[i]);
              centers[i].y = Math.floor(sum[i * 2 + 1] / count[i]);
          }else{
              centersCount--;
              centers[centersCount] = centers[i];


          }

      }


  }


  


  const centersArray = Array(centersCount * 2).fill(0);

  for(let i = 0;i < centersCount;i++){
      centersArray[i * 2] = centers[i].x;
      centersArray[i * 2 + 1] = centers[i].y;
  }

  const pointsJson = JSON.stringify(centersArray);
  

 
  const placeholderBuffer = await sharp(result,{raw: {width, height, channels: 3}}).jpeg().toBuffer();

  
  const placeholderKey = `placeholders/${Date.now().toString(36)}.jpg`;

  const pointsKey = `tracing/${Date.now().toString(36)}.json`;




  await storage.putObject({
    key: placeholderKey,
    body: placeholderBuffer,
  });

  await storage.putObject({
    key: pointsKey,
    body: pointsJson,
    contentType: "application/json"

  })


  
  question.placeholder = placeholderKey;
  question.points = pointsKey;
}

const handleDotsPlaceholder = async (question:QuestionDocument,placeholder:ArrayBuffer) => {
  const width = 300;
    const height = 300;
    const image = await sharp(placeholder)
    
      .resize({ fit: "fill", width: width, height: height ,"withoutReduction":true})
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .grayscale()
      .threshold(150)
      .raw()
      .toBuffer();









    for (let i = 0; i < image.length; i++) {
      if (image[i] > 200) image[i] = 255;
    }

 
    
    const sizes:number[] = [];
    const sum = [];

    let buffer = Buffer.alloc(image.length, 0);

    for (let i = 0; i < image.length; i++) {
      if (image[i] < 200 && buffer[i] == 0) {
        const queue = [i];
        sum.push(0,0);
        sizes.push(0);

        while (queue.length > 0) {
          const index = queue.shift()!;
          if (buffer[index] != 0 || image[index] > 200) continue;

          sizes[sizes.length - 1]++;
          buffer[index] = sizes.length;
          if (index % width > 0) {
            queue.push(index - 1);
          }
          if (index % width < width - 1) {
            queue.push(index + 1);
          }
          if (index - width >= 0) {
            queue.push(index - width);
          }
          if (index + width < image.length) {
            queue.push(index + width);
          }
        }
  
      }
    }

    

   



    for (let i = 0; i < image.length; i++) {
      const j = buffer[i] - 1
      if (sizes[j] < 300) {
        const x = Math.floor(i % width);
        const y = Math.floor(i / width);

        image[i] = 255;
        sum[j * 2] += x;
        sum[j * 2 + 1] += y;

      } else {
        i;
        buffer[i] = 0;
      }
    }

    const dots = [];

    for(let i = 0;i < sizes.length;i++){
      if(sizes[i] < 300){
        const x = Math.round(sum[i * 2] / sizes[i]);
        const y = Math.round(sum[i * 2 + 1] / sizes[i]);
        dots.push(x,y);
      }
    }
    const Key = `placeholder/${Date.now().toString(36)}.jpg`;

    const placeholderBuffer = await sharp(image,{raw: {width, height, channels: 1}}).jpeg().toBuffer();


    await storage.putObject({
      key: Key,
      body: placeholderBuffer,

    })


    question.dots = dots;
    question.placeholder = Key;
}


interface GetQuestionsParameters {
  page?: number;
  skillId?: string;
  type?: string;
}

class Coordinate {
  constructor(public x: number, public y: number) {}

  clone() {
    return new Coordinate(this.x, this.y);
  }
}

interface GetQuestionsResponse {
  questions: BaseQuestion[];
  totalPages: number;
}




export const getQuestions = async ({
  page = 1,
  skillId,
  type
}: GetQuestionsParameters): Promise<GetQuestionsResponse> => {
  const limit = 10;

  const skip = (page - 1) * limit;


  await connectToDB();

  const filter:FilterQuery<any>  = {};

  if(skillId){
    filter["skillId"] = skillId
  }

  if(type){
    filter["type"] = type
  }

  const questions = await QuestionModel.find(filter).skip(skip).limit(limit);

  const totalQuestions = await QuestionModel.countDocuments(filter);

  return {
    totalPages: Math.ceil(totalQuestions / limit),
    questions,
  };
};

export const createQuestion = async (formData: FormData) => {
  const text = formData.get("text");
  const skillId = formData.get("skillId");
  const difficulty = +formData.get("difficulty")!;

  const type = formData.get("type") as string;

  

  const question = new QuestionModel({
    text,
    difficulty,
    type,
    skillId,
  });

  const image = formData.get("image") as File;

  if (image.size > 1048576) {
    throw new Error("Image is too large");
  }

  if (image.size !== 0) {
    const stream = image.stream();
    const Key = `images/${Date.now().toString(36)}${path.extname(image.name)}`;

    await storage.putStreamObject({
      key: Key,
      stream: stream,
    })
    question.image = Key;
  }

  if (type == "writing") {
    question.expectedWord = formData.get("expectedWord");
  } else if (type == "font tracing") {
    const placeholder = formData.get("placeholder") as File;
    const buffer = await placeholder.arrayBuffer()
    handleFontTracingPlaceholder(question, buffer);

  } else if (type == "dots") {
    const placeholder = formData.get("placeholder") as File;
    const buffer = await placeholder.arrayBuffer()
    handleDotsPlaceholder(question, buffer);
  } else if (type === "mcq") {
    const options = formData
      .getAll("option")
      .map((text) => ({ text, isCorrect: false }));

    const correctedOption = +formData.get("correctOption")!;

    options[correctedOption].isCorrect = true;

    question.options = options;
  } else if (type === "checkbox") {
    const options = formData
      .getAll("option")
      .map((text) => ({ text, isCorrect: false }));

    const correctedOptions = formData
      .getAll("correctOption")
      .map((text) => +text);

    for (const option of correctedOptions) {
      options[option].isCorrect = true;
    }

    question.options = options;
  }

  await addAudio(question);
  await connectToDB();
  await question.save();

  return question;
};

export const deleteQuestion = async (id: string) => {
  await connectToDB();
  const question: QuestionDocument | null = await QuestionModel.findById(id);
  if(!question) return;
  await question.deleteOne();
};

export const getQuestion = async (id: string) => {
  await connectToDB();
  const question = await QuestionModel.findById(id);
  return question;
};

export const updateQuestion = async (id: string, formData: FormData) => {
  const text = formData.get("text");
  const difficulty = formData.get("difficulty");
  const skillId = formData.get("skillId");
  const placeholder = formData.get("placeholder") as File;

  


  await connectToDB();
  const question = await QuestionModel.findById(id);
  if(!question) throw new Error("question not found");

  question!.difficulty = +difficulty!;
  question.skillId = skillId;


  if(text != question.text){
    await storage.deleteObject({
      key: question.audio
    })
    question.text = text;
    await addAudio(question);
  }


  if(placeholder.size > 0){
    await storage.deleteObject({
      key: question.placeholder
    })
    
    if (question.type == "font tracing") {
      await storage.deleteObject({
        key: question.points
      })
      
      const buffer = await placeholder.arrayBuffer()
      await handleFontTracingPlaceholder(question, buffer);


  
    } else if (question.type == "dots") {
      const buffer = await placeholder.arrayBuffer()

      await handleDotsPlaceholder(question, buffer);
    } 
  }

  await question.save();




};
