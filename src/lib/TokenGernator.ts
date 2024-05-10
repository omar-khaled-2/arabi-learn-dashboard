import { JWT_SECRET } from "@/constants";
import {SignJWT,base64url,jwtVerify} from "jose"; 
class TokenGeneratorImpl {

    private constructor() {}

    static instance = new TokenGeneratorImpl();

    private secret = new TextEncoder().encode(
        JWT_SECRET
      )
    private readonly alg = 'HS256'
    async generate(
        payload: Record<string, unknown>,
    ) {

        console.log(this.alg)
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: this.alg })
            .sign(this.secret);
        return token
    }

    async verify(token: string){

        const result = await jwtVerify(token, this.secret) ;

        const payload = result.payload as Record<string, unknown>;

  

        return payload
    }



}

export default TokenGeneratorImpl