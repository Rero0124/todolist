import prisma from "..";

export const createPost = async (postInfo: PostType): Promise<PostType> => {
    let result: PostType = {postId: 0, title: '', content: '', checked: false, authorId: ''};
    prisma.post.create({
        data: {
            title: postInfo.title,
            content: postInfo.content,
            checked: postInfo.checked,
            authorId: postInfo.authorId,
        },
    }).then((data: PostType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const modifyPost = async (postInfo: PostType): Promise<PostType> => {
    let result: PostType = {postId: 0, title: '', content: '', checked: false, authorId: ''};
    await prisma.post.update({
        data: {
            title: postInfo.title,
            content: postInfo.content,
            checked: postInfo.checked,
        },
        where: {
            postId: postInfo.postId,
        },
    }).then((data: PostType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const removePost = async (postId: number): Promise<PostType> => {
    let result: PostType = {postId: 0, title: '', content: '', checked: false, authorId: ''};
    await prisma.post.delete({
        where: {
            postId: postId
        },
    }).then((data: PostType) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}

export const getPost = async (postId: number): Promise<PostType> => {
    let result: PostType = {postId: 0, title: '', content: '', checked: false, authorId: ''};
    await prisma.post.findUnique({
        where: {
            postId: postId,
        }
    }).then((data: PostType | null) => { result = data ?? result })
    .catch((err: Error) => { throw err })
    return result;
}

export const getAllPost = async (postInfo: PostType): Promise<PostType[]> => {
    let result: PostType[] = [];
    await prisma.post.findMany({
        where: {
            authorId: postInfo.authorId,
        },
    }).then((data: PostType[]) => { result = data })
    .catch((err: Error) => { throw err })
    return result;
}