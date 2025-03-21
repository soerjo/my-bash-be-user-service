import { encrypt, staticEncrypt } from "src/utils/encrypt.util";
import * as crypto from 'crypto';

describe("encrypt", () => {
    it('should encrypt text', () => {
        const text = 'string';
        const encrypted = encrypt(text);
        console.log({encrypted});

        expect(encrypted).toBeDefined();
        expect(encrypted).not.toEqual(text);
    });

    it("generate random text", () => {
        const buffer  = crypto.randomBytes(16);
        const str = buffer.toString('hex');

        console.log({buffer, str});

        expect(buffer.toString('hex')).toEqual(str);
        expect(Buffer.from(str, 'hex')).toEqual(buffer);
    });

    it("should encrypt with staticEncrypt", () => {
        const text = 'soerjoprod@gmail.com';
        const encrypted = staticEncrypt(text);
        console.log({encrypted});

        expect(encrypted).toBeDefined();
        expect(encrypted).not.toEqual(text);
    });
});