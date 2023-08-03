import Prisma from "..";

const prisma = Prisma;

export const createPost = (postInfo: PostType) => {
    return prisma.post.create({
        data: {
            title: postInfo.title,
            content: postInfo.content,
            authorId: postInfo.authorId,
        },
    }).then(data => data)
    .catch(err => err)
}

export const modifyPost = (postInfo: PostType) => {
    return prisma.post.update({
        data: {
            title: postInfo.title,
            content: postInfo.content,
        },
        where: {
            postId: postInfo.postId,
        },
    }).then(data => data)
    .catch(err => err)
}

export const getPost = (postInfo: PostType) => {
    return prisma.post.findMany({
        where: {
            postId: postInfo.postId,
        }
    }).then(data => data)
    .catch(err => err)
}

export const getAllPost = (postInfo: PostType) => {
    return prisma.post.findMany({
        where: {
            authorId: postInfo.authorId,
        },
    })
    .then(data => data)
    .catch(err => err)
}