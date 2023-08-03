import Prisma from "..";

const prisma = Prisma

export const createUser = (userInfo: UserType) => {
    return prisma.user.create({
        data: {
            id: userInfo.id,
            pw: userInfo.pw,
            salt: userInfo.salt,
        },
    }).then(data => {return data})
    .catch(err => err)
}

export const modifyUser = (userInfo: UserType): UserType => {
    let result: UserType = {id: '', pw: '', salt: ''};
    prisma.user.update({
        data: {
            pw: userInfo.pw,
            salt: userInfo.salt,
        },
        where: {
            id: userInfo.id
        },
    }).then(data => result = data as UserType)
    .catch(err => {throw new Error(err)})
    return result;
}

export const getUser = (id: string) => {
    prisma.user.findMany({
        where: {
            id: id,
        },
    }).then(data => data)
    .catch(err => err)
}

export const getAllUser = () => {
    
    prisma.user.findMany()
    .then(data => data)
    .catch(err => err)
}

export const loginUser = (userInfo: UserType) => {
    prisma.user.count({
        where: {
            id: userInfo.id,
            pw: userInfo.pw,
        },
    }).then(data => data)
    .catch(err => err)
}