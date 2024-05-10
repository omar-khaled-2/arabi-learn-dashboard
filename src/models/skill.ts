import mongoose, { Schema, model, Document } from "mongoose";
import QuestionModel from "./question";

export interface Skill {
  id: string;
  name: string;
  maxDifficulty: number;
}

export interface SkillDocument extends Document, Omit<Skill, "id"> {}

const skillSchema = new Schema<SkillDocument>({
  name: { type: String, required: true },
  maxDifficulty: { type: Number, required: true, default: 0 },
});



skillSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});




skillSchema.post("deleteOne", async function () {
  const query = this.getQuery()
  const id = query._id
  const questions = await QuestionModel.find({skill:id})
  await Promise.all(questions.map(question => question.deleteOne()))
})

const SkillModel =  mongoose.models?.Skill || model<SkillDocument>("Skill", skillSchema);

export default SkillModel;
