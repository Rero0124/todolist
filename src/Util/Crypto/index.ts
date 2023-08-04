import CryptoJS, { PBKDF2, AES } from "crypto-js";

const iterations = 10000;

export const encryptoAES = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

    const encrypted = AES.encrypt(
        str,
        CryptoJS.enc.Hex.parse(salt),
    );

    return {str: encrypted.toString(), salt: salt}
}
export const decryptoAES = (str: string, salt: string): CryptoType => {
    const encrypted = AES.decrypt(
        str,
        CryptoJS.enc.Hex.parse(salt),
    );

    return {str: encrypted.toString(), salt: salt}
}

export const encodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str)); }

export const decodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.parse(str).toString(); }

export const encryptoSHA256 = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const encryptedStr = PBKDF2(str, CryptoJS.enc.Hex.parse(salt), { keySize: 512 / 32, iterations: iterations }).toString();
    return { str: encryptedStr, salt: salt };
}