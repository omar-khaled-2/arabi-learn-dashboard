
import { cookies } from "next/headers";
import User from "../models/user";
import TokenGeneratorImpl from "./TokenGernator";
import connectToDB from "../utilities/connectToDB";

class Authentication {
    private constructor() {}

    static instance = new Authentication()
    async login(username: string, password: string): Promise<void> {
        await connectToDB()
        console.log(username, password)
        
        const user = await User.findOne({username})
        if(!user) throw new Error("User not found")
        const isPasswordValid = await user.validatePassword(password)
        if(!isPasswordValid) throw new Error("Invalid password")
        const payload = {
            uid: user.id
        }
        const token = await TokenGeneratorImpl.instance.generate(payload)
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)
        cookies().set("token", token,{
            httpOnly: true,

            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        })


    
        
        
    }

    async logout(): Promise<void> {
        cookies().delete("token")
    }

    async isAuthenticated(): Promise<boolean> {
        
        const token = cookies().get("token")?.value

        if(!token) return false
        const payload = await TokenGeneratorImpl.instance.verify(token)

        const uid = payload.uid

    

        await connectToDB()

        // const isExist = await User.exists({_id: uid})

        


        return Boolean(true)

    }

    async getCurrentUser() {

        const token = cookies().get("token")?.value
        if(!token) return null
        const payload =  await TokenGeneratorImpl.instance.verify(token)
        const uid = payload.uid
        await connectToDB()

        const user = await User.findById(uid)

        return user
        
    }


    async createUser(username: string, password: string): Promise<string> {
        await connectToDB()
        const isExist = await User.exists({username})
        if(isExist) throw new Error("User already exists")

        const user = new User({username, password})
        await user.setPassword(password)
        await user.save()

        return user.id

    }

}


export default Authentication