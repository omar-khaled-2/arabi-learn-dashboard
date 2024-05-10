import dotenv from 'dotenv'




export const MONGODB_URL = process.env.MONGODB_URL!
export const BUCKET_NAME = process.env.BUCKET_NAME!;
export const IS_DEV = process.env.NODE_ENV === "development";
export const JWT_SECRET = process.env.JWT_SECRET!;
