import { decryptoAES, encryptoAES, encryptoSHA256 } from "../Crypto";

const apiUrl = 'http://localhost:5000/user/';

export const loginUser = async (userId: string, userPw: string): Promise<boolean> => {
    let result = {message: '', result: {userId: '', userPw: '', salt: '', sessionId: null}};

    await fetch(apiUrl + userId + '/', {
        method: 'GET',
    }).then(res => res.json()).then((data) => { result = data });

    let userInfo = {userId: userId, userPw: userPw, salt: '', seessionId: null};
    const encryptoResult = encryptoSHA256(userInfo.userPw, result.result.salt);
    userInfo.userPw = encryptoResult.str;
    userInfo.salt = encryptoResult.salt;

    await fetch(apiUrl + '/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userInfo),
    }).then(res => res.json()).then((data) => { result = data });

    console.log(result.result);

    if(result.result) {
        if(result.result.userPw === encryptoResult.str) {
            const ipData = await fetch('https://geolocation-db.com/json/');
            const locationIp: clientLocation = await ipData.json();
            const now = Date.now();
            const sessionStr = locationIp.IPv4 + '_' + now;
            const sessionId = encryptoAES(sessionStr, result.result.salt).str;
            localStorage.setItem('userId', userId);
            localStorage.setItem('sessionId', sessionId);
            return true;
        }
    }
    return false;
}

export const loginCheck = async (): Promise<boolean> => {
    const userId = localStorage.getItem('userId');
    if(userId) {
        let result = {message: '', result: {userId: '', userPw: '', salt: '', sessionId: null}};
        await fetch(apiUrl + userId + '/', {
            method: 'GET',
        }).then(res => res.json()).then((data) => { result = data });
        if(result.result) {
            const ipData = await fetch('https://geolocation-db.com/json/');
            const locationIp: clientLocation = await ipData.json();
            const now = Date.now();
            const sessionStr = locationIp.IPv4 + '_' + now;
            const oldSessionStr = decryptoAES(result.result.sessionId!, result.result.salt).str;
            if(oldSessionStr.split('_')[0] === locationIp.IPv4 && new Date(parseInt(oldSessionStr.split('_')[1])).valueOf() - now.valueOf() > 3) {
                const sessionId = encryptoAES(sessionStr, result.result.salt).str;
                localStorage.setItem('sessionId', sessionId);
                return true;
            }
        }
    }
    localStorage.setItem('userId', '');
    localStorage.setItem('sessionId', '');
    return false;
}

export const hasId = async (userId: string) => {
    let result = {message: '', result: {userId: '', userPw: '', salt: '', sessionId: null}};
    await fetch(apiUrl + userId + '/', {
        method: 'GET',
    }).then(res => res.json()).then((data) => { result = data });
    if(!result.result) {
        return true;
    } 
    return false;
}

export const registerUser = async (userId: string, userPw: string): Promise<boolean> => {
    let result = {message: '', result: {userId: '', userPw: '', salt: '', sessionId: null}};
    let userInfo = {userId: userId, userPw: userPw, salt: '', seessionId: null};
    const encryptoResult = encryptoSHA256(userInfo.userPw);
    userInfo.userPw = encryptoResult.str;
    userInfo.salt = encryptoResult.salt;
    await fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(userInfo),
    }).then(res => res.json()).then((data) => { result = data });
    if(result.result) {
        return true;
    }
    return false;
}

