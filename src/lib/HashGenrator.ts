import bcrypt from 'bcryptjs';

interface HashGenerator {
    generate(text: string): Promise<string>;
    verify(text: string, hash: string): Promise<boolean>;
}

class HashGeneratorImpl implements HashGenerator {

    private constructor() {}

    static instance = new HashGeneratorImpl();
    
    public generate(text: string): Promise<string> {
        return bcrypt.hash(text,10);
    }

    public verify(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash);
    }


}

export default HashGeneratorImpl