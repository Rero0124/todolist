import prisma from "..";

export const createUser = async (userInfo: UserType): Promise<UserType> => {
    let result: UserType = {userId: '', userPw: '', salt: '', sessionId: null};
    await prisma.user.create({
        data: {
            userId: userInfo.userId,
            userPw: userInfo.userPw,
            salt: userInfo.salt,
            sessionId: userInfo.sessionId,
        },
    }).then((data: UserType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const modifyUser = async (userInfo: UserType): Promise<UserType> => {
    let result: UserType = {userId: '', userPw: '', salt: '', sessionId: null};
    await prisma.user.update({
        data: {
            userPw: userInfo.userPw,
            salt: userInfo.salt,
        },
        where: {
            userId: userInfo.userId,
        },
    }).then((data: UserType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const modifyUserSessionId = async (userInfo: UserType): Promise<UserType> => {
    let result: UserType = {userId: '', userPw: '', salt: '', sessionId: null};
    await prisma.user.update({
        data: {
            sessionId: userInfo.sessionId,
        },
        where: {
            userId: userInfo.userId,
        },
    }).then((data: UserType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const getUser = async (userId: string): Promise<UserType> => {
    let result: UserType = {userId: '', userPw: '', salt: '', sessionId: null};
    await prisma.user.findUnique({
        where: {
            userId: userId,
        },
    }).then((data: UserType | null) => { result = data ?? result })
    .catch((err: Error) => { throw err })
    return result;
}

export const getAllUser = async (): Promise<UserType[]> => {
    let result: UserType[] = [];
    await prisma.user.findMany()
    .then((data: UserType[]) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}