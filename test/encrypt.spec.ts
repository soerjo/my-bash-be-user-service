import { encrypt } from "src/utils/encrypt.util";

describe("encrypt", () => {
    it('should encrypt text', () => {
        const text = 'string';
        const encrypted = encrypt(text);
        console.log({encrypted});

        expect(encrypted).toBeDefined();
        expect(encrypted).not.toEqual(text);
    });
});