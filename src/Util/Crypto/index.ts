import CryptoJS, { PBKDF2, AES } from "crypto-js";

const key = process.env.REACT_APP_SECRET_KEY;
const iv = process.env.REACT_APP_IV_KEY;
const iterations = 10000;

export const encryptoAES = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

    const encrypted = AES.encrypt(
        str,
        CryptoJS.enc.Hex.parse(salt),
        { iv: CryptoJS.enc.Hex.parse(iv) },
    );

    return {str: encrypted.toString(), salt: salt}
}
export const decryptoAES = (str: string, salt: string): CryptoType => {
    const encrypted = AES.decrypt(
        str,
        CryptoJS.enc.Hex.parse(salt),
        { iv: CryptoJS.enc.Hex.parse(iv) },
    );

    return {str: encrypted.toString(), salt: salt}
}

export const encodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str)); }

export const decodeBase64 = (str: string): string => { return CryptoJS.enc.Base64.parse(str).toString(); }

export const encryptoSHA256 = (str: string, originSalt?: string): CryptoType => {
    const salt = originSalt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

    const key512Bits10000Iterations = PBKDF2(key, CryptoJS.enc.Hex.parse(salt), {
        keySize: 512 / 32,
        iterations,
    })

    return encryptoAES(str, key512Bits10000Iterations.toString());
}