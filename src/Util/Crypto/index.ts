import CryptoJS, { PBKDF2, AES } from "crypto-js";

const iterations = 10000;
const secretKey = process.env.REACT_APP_SECRET_KEY;

export const encryptoAES = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

    const encrypted = AES.encrypt(
        str,
        secretKey,
        {
            padding: CryptoJS.pad.Pkcs7,
    		mode: CryptoJS.mode.CBC
        }
    );

    return { str: encrypted.toString(), salt: salt }
}
export const decryptoAES = (str: string, salt: string): CryptoType => {
    const encrypted = AES.decrypt(
        str,
        secretKey,
        {
            padding: CryptoJS.pad.Pkcs7,
    		mode: CryptoJS.mode.CBC
        }
    );

    return { str: encrypted.toString(CryptoJS.enc.Utf8), salt: salt }
}

export const encodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str)); }

export const decodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.parse(str).toString(); }

export const encryptoSHA256 = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const encryptedStr = PBKDF2(str, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations: iterations }).toString();
    return { str: encryptedStr, salt: salt };
}