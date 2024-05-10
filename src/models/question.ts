import mongoose, { Document, Schema, model } from "mongoose";
import SkillModel from "./skill";

import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechInput,
} from "@aws-sdk/client-polly";

import { config } from "dotenv";
import { Upload } from "@aws-sdk/lib-storage";
import storage from "@/lib/Storage";

config();
export interface BaseQuestion {
  id: string;
  text: string;
  difficulty: number;
  skillId: string;
}


export interface IOption {
  id: string;
  text: string;
  isCorrect: boolean;
}
export interface IQuestion extends BaseQuestion {
  type: string;
  placeholder?: string;
  image?: string;
  expectedWord?: string;
  options: IOption[];
  audio: string;
  points:string;
  dots: number[];
}

export interface QuestionDocument extends Document, Omit<IQuestion, "id"> {}

export interface OptionDocument extends Document, Omit<IOption, "id"> {}

const optionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

optionSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      id: ret._id,
      text: ret.text,
      difficulty: ret.difficulty,
      skillId: ret.skillId,
    };
  },
});

const questionSchema = new Schema<QuestionDocument>({
  text: { type: String, required: true },
  difficulty: { type: Number, required: true },
  type: { type: String, required: true },
  skillId: { type: String, required: true },
  placeholder: { type: String },
  image: { type: String },
  audio: { type: String },
  expectedWord: { type: String },
  points: { type: String,required: false },
  options: { type: [optionSchema] },
  dots: { type: [Number] },
});

questionSchema.set("toJSON", {
  transform: (doc, ret) => {
    return {
      id: ret._id,
      text: ret.text,
      difficulty: ret.difficulty,
      skillId: ret.skillId,
    };
  },
});

questionSchema.post("save", async (doc) => {
  const skill = await SkillModel.findById(doc.skillId);
  if (!skill) throw new Error("skill not found");
  skill.maxDifficulty = Math.max(skill.maxDifficulty, doc.difficulty);
  await skill.save();
});






questionSchema.post("deleteOne",{document:true, query:false}, async function (doc) {
  const { image, audio,points } = doc;
  if(image) 
    await storage.deleteObject({
      key: image
    })

  if(audio) 
    await storage.deleteObject({
      key: audio
    })
  


  if(points)
    await storage.deleteObject({
      key: points
    })


  

})




const Question =
  mongoose.models?.Question ||
  model<QuestionDocument>("Question", questionSchema);

export default Question;
