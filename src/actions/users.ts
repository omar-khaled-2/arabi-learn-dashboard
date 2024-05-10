"use server"

import Authentication from "../lib/Authentication";
import User from "../models/user";
import { redirect } from "next/navigation";


export const getUsers = async () => {
    const users = await User.find();

    return users


}


export const addUser = async(formData: FormData) => {

    const username = formData.get("username") as string
    const password = formData.get("password") as string



    const userId = await Authentication.instance.createUser(username, password);

    redirect(`/dashboard/users/${userId}`)
}

export const getUser = async (id: string) => {

    const user = await User.findById(id);

    return user
}

export const deleteUser = async (id: string) => {
    await User.deleteOne({ _id: id });
}