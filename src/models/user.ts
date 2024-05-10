import mongoose, { Schema,model,Model } from "mongoose";
import HashGeneratorImpl from "../lib/HashGenrator";

interface IUser{
    username: string;
    password: string;
}


interface IUserMethods {
    setPassword(password: string): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
  

interface UserModel extends Model<IUser, {}, IUserMethods> {
}

const userSchema = new Schema<IUser, UserModel>({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    


},{
    methods: {
        async setPassword(password: string) {
            this.password = await HashGeneratorImpl.instance.generate(password);
        },
        async validatePassword(password: string) {
            return await HashGeneratorImpl.instance.verify(password, this.password);
        }
    }
})







const User = (mongoose.models?.User as UserModel) || model<IUser, UserModel>("User", userSchema);


export default User