import { BUCKET_NAME, IS_DEV } from "../constants";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs/promises";
import {ReadStream, createWriteStream} from 'fs'
import { Upload } from "@aws-sdk/lib-storage";


interface PutObjectParameters {
    key: string;
    body:string | Uint8Array | Buffer;
    contentType?: string;
}


interface PutStreamObjectParameters {
    key: string;
    stream: ReadableStream<any>;
}

interface DeleteObjectParameters {
    key: string;
}

interface Storage {
    putObject: (params: PutObjectParameters) => Promise<void>;
    deleteObject: (params: DeleteObjectParameters) => Promise<void>;
    putStreamObject: (params: PutStreamObjectParameters) => Promise<void>;
    getURL: (key: string) => string;
}

class S3Storage implements Storage {
    private client: S3Client = new S3Client();

    async putObject({ key, body,contentType }: PutObjectParameters) {
        
        
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: contentType
        });

        await this.client.send(command);

    }

    async putStreamObject({ key, stream }: PutStreamObjectParameters) {

        const uploader = new Upload({
            client: this.client,
            params: {
              Bucket: BUCKET_NAME,
              Key:key,
              Body: stream,
            },
          });
        
          await uploader.done();
    }

    async deleteObject({ key }: DeleteObjectParameters) {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });

        await this.client.send(command);

    }

    getURL(key: string) {
        return `https://${process.env.BUCKET_NAME!}.s3.${process.env.REGION!}.amazonaws.com/${key}`
    }
}

// class LocalStorage implements Storage {
//     async putObject({ key, body }: PutObjectParameters) {

//         await fs.writeFile(path.join(__dirname, `../public/media/${key}`), body);
//     }

//     async putStreamObject({ key, stream }: PutStreamObjectParameters) {


//         const writeStream = createWriteStream(path.join(__dirname, `../public/media/${key}`));

//         const reader = stream.getReader();

//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;
//             writeStream.write(value);
//         }
//         writeStream.end();
            
    
    
//     }

//     async deleteObject({ key }: DeleteObjectParameters) {
//         await fs.unlink(path.join(__dirname, `../public/media/${key}`));
//     }

//     getURL(key: string) {
//         return `http://localhost:3000/media/${key}`
//     }
// }





const storage = new S3Storage();



export default storage