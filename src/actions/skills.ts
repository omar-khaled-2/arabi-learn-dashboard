"use server";
import SkillModel from "@/models/skill";
import connectToDB from "@/utilities/connectToDB";
import { FilterQuery } from "mongoose";
import { redirect } from "next/navigation";

interface GetSkillsParams{
  name?:string
}

export const getSkills = async ({name}:GetSkillsParams) => {
  await connectToDB();

  const filter:FilterQuery<any> = {}

  if(name)
    filter["name"] = {$regex: name, $options: "i"}
  

  const skills = await SkillModel.find();


  return skills;
};

export const deleteSkill = async (id: string) => {
  await connectToDB();
  await SkillModel.deleteOne({ _id: id });
  

};

export const updateSkill = async (id: string, formData: FormData) => {
  const name = formData.get("name");
  await connectToDB();
  await SkillModel.findByIdAndUpdate(id, { name });
};

export const createSkill = async (formData: FormData) => {
  const name = formData.get("name") as string;

  await connectToDB();
  const skill = await SkillModel.create({ name });

  redirect(`/dashboard/skills/${skill.id}`);
};

export const getSkill = async (id: string) => {
  await connectToDB();
  const skill = await SkillModel.findById(id);
  return skill;
};
