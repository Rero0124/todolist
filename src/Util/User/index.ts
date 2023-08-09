import { decryptoAES, encryptoAES, encryptoSHA256 } from "../Crypto";

const apiUrl = 'http://localhost:5000/user/';

export const loginUser = async (userId: string, userPw: string) => {
    let result = { message: '', result: { userId: '', userPw: '', salt: '', sessionId: null } };
    
    await fetch(apiUrl + userId + '/', {
        method: 'GET',
    }).then(res => res.json()).then((data) => { result = data });
    
    if(result.result) {
        let userInfo = {userId: userId, userPw: userPw, salt: '', sessionId: ''};
        const encryptoResult = encryptoSHA256(userInfo.userPw, result.result.salt);
        userInfo.userPw = encryptoResult.str;
        userInfo.salt = encryptoResult.salt;
        
        await fetch(apiUrl + 'login/', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(userInfo),
        }).then(res => res.json()).then((data) => { result = data });
    
        if(result.result) {
            if(result.result.userPw === encryptoResult.str) {
                const ipData = await fetch('https://geolocation-db.com/json/');
                const locationIp: clientLocation = await ipData.json();
                const now = new Date().getTime();
                const sessionStr = locationIp.IPv4 + '_' + now;
                const sessionId = encryptoAES(sessionStr, result.result.salt).str;
                userInfo.sessionId = sessionId;
                await fetch(apiUrl + 'login/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(userInfo),
                }).then(res => res.json()).then((data) => { result = data });
                if(result.result) {
                    return { test: true, result: { userId: result.result.userId, sessionId: sessionId, remove: false } };
                }
                return { test: false, result: null };
            }
        }
    }

    return { test: false, result: null };
}

export const loginCheck = async (userId: string, sessionId: string) => {
    if(userId) {
        let result = {message: '', result: {userId: '', userPw: '', salt: '', sessionId: ''}};
        await fetch(apiUrl + userId + '/', {
            method: 'GET',
        }).then(res => res.json()).then((data) => { result = data });
        if(result.result.sessionId === sessionId) {
            const ipData = await fetch('https://geolocation-db.com/json/');
            const locationIp: clientLocation = await ipData.json();
            const now = new Date().getTime();
            const sessionStr = locationIp.IPv4 + '_' + now;
            const oldSessionStr = decryptoAES(result.result.sessionId!, result.result.salt).str;
            if(oldSessionStr.split('_')[0] === locationIp.IPv4 && new Date(parseInt(oldSessionStr.split('_')[1])).getTime() - now < 1000 * 60 * 60 * 24 * 3) {
                const sessionId = encryptoAES(sessionStr, result.result.salt).str;
                return { test: true, result: { userId: result.result.userId, sessionId: sessionId, remove: false } };
            } else {
                return { test: true, result: { remove: true } };
            }
        }
    } else {
        return { test: true, result: { remove: true } };
    }
    return { test: false, result: null };
}

export const hasId = async (userId: string) => {
    let result = { message: '', result: {userId: '', userPw: '', salt: '', sessionId: null } };
    await fetch(apiUrl + userId + '/', {
        method: 'GET',
    }).then(res => res.json()).then((data) => { result = data });
    if(!result.result) {
        return true;
    } 
    return false;
}

export const logoutUser = async () => {
    const userId = localStorage.getItem('userId') ?? '';
    let result = {message: '', result: {userId: '', sessionId: null}};
    await fetch(apiUrl + 'logout/', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: `{"userId": "${userId}", "sessionId": null}`,
    }).then(res => res.json()).then((data) => { result = data });
    if(result.result) {
        localStorage.removeItem('userId');
        localStorage.removeItem('sessionId');
        return { test: true, result: { remove: true } };
    }
    return { test: false, result: null };
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

