import { encryptPassword } from 'src/utils/hashing.util';
import { getWeeksInMonth } from '../src/utils/week-in-month.utils';
import {verify} from 'jsonwebtoken'

describe('AppController (e2e)', () => {
  it('get week in month func', () => {
    const result = getWeeksInMonth(2024, 6);
  });
});

describe("test generate hash password", () => {
  it('should encrypt password', () => {
    const password = 'asdf1234.';
    const encryptedPassword = encryptPassword(password);
    console.log({encryptedPassword});
    expect(encryptedPassword).toBeDefined();
  });
})


describe('test validation token', () => {
  it('should validate token', () => {
    const password = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUsIm5hbWUiOiJzb2Vyam8iLCJ1c2VybmFtZSI6InNvZXJqbyIsImVtYWlsIjoicnlvaGFzdG9tb0BnbWFpbC5jb20iLCJyZXF1ZXN0IjoidmVyaWZ5X2VtYWlsIiwiaWF0IjoxNzQ1MjA3MzEyLCJleHAiOjE3NDUyMTQ1MTJ9.g4SGrvVeW-kTeCOCOZDs5XFhyPP3JFPwrlrhItiOUnE';
    const secret = "rahasia_bangsa";
    const isValid = verify(password, secret);
    console.log({isValid});
    expect(isValid).toBeDefined();
    expect(isValid).toBeTruthy();
  });
})