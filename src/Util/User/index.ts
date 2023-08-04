import { decryptoAES, encryptoAES, encryptoSHA256 } from "../Crypto";
import { getUser } from "../DB/User"

export const loginUser = async (userId: string, pw: string): Promise<boolean> => {
    const result = await getUser(userId);
    if(result.userId !== '') {
        const encryptoResult = encryptoSHA256(pw, result.userPw);
        if(result.userPw === encryptoResult.str) {
            const ipData = await fetch('https://geolocation-db.com/json/');
            const locationIp: clientLocation = await ipData.json();
            const now = Date.now();
            const sessionStr = locationIp.IPv4 + '_' + now;
            const sessionId = encryptoAES(sessionStr, result.salt).str;
            localStorage.setItem('userId', userId);
            localStorage.setItem('sessionId', sessionId);
        }
    }
    return false;
}

export const loginCheck = async (): Promise<boolean> => {
    const userId = localStorage.getItem('userId') ?? '';
    const result = await getUser(userId);
    if(result.userId !== '') {
        const ipData = await fetch('https://geolocation-db.com/json/');
        const locationIp: clientLocation = await ipData.json();
        const now = Date.now();
        const sessionStr = locationIp.IPv4 + '_' + now;
        const oldSessionStr = decryptoAES(result.sessionId!, result.salt).str;
        if(oldSessionStr.split('_')[0] === locationIp.IPv4 && new Date(parseInt(oldSessionStr.split('_')[1])).valueOf() - now.valueOf() > 3) {
            const sessionId = encryptoAES(sessionStr, result.salt).str;
            localStorage.setItem('sessionId', sessionId);
            return true;
        }
    }
    localStorage.setItem('userId', '');
    localStorage.setItem('sessionId', '');
    return false;
}

export const hasId = async (userId: string) => {
    const result = await getUser(userId);
    if(result.userId === '') {
        return true;
    } 
    return false;
}

export const registerUser = async (userId: string, userPw: string): Promise<boolean> => {
    
    return false;
}

