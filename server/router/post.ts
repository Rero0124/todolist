import express, { Request, Response } from 'express';
import { prisma } from '..';

interface PostType {
    postId: number;
	title: string;
	content: string;
    checked: boolean;
	authorId: string;
}

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        let postInfo = req.body ?? { content: '', authorId: ''};
        if(postInfo.authorId) {
            const result: { postId: number } = await prisma.post.create({
                select: {
                    postId: true,
                },
                data: {
                    title: '',
                    content: postInfo.content,
                    checked: false,
                    authorId: postInfo.authorId,
                },
            })
            return res.status(200).json({ message: "post create success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null });
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        let postInfo: PostType = req.body ?? {postId: 0, title: '', content: '', checked: false, authorId: ''};
        if(postInfo.postId !== 0) {
            const result: PostType = await prisma.post.update({
                data: {
                    title: postInfo.title,
                    content: postInfo.content,
                    checked: postInfo.checked,
                },
                where: {
                    postId: postInfo.postId,
                },
            })
            return res.status(200).json({ message: "post update success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null});
    }
})

router.patch('/', async (req: Request, res: Response) => {
    try {
        let postInfo = req.body ?? { postId: 0, checked: false };
        console.log(postInfo)
        if(postInfo.postId !== 0) {
            const result: PostType = await prisma.post.update({
                data: {
                    checked: postInfo.checked,
                },
                where: {
                    postId: postInfo.postId,
                },
            })
            return res.status(200).json({ message: "post update success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null});
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        let postId = req.body.postId ?? '';
        if(postId) {
            const result: PostType = await prisma.post.delete({
                where: {
                    postId: postId
                },
            })
            return res.status(200).json({ message: "post create success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null });
    }
})

router.get('/:postId', async (req: Request, res: Response) => {
    try {
        let postId = parseInt(req.params.postId) ?? 0;
        if(postId) {
            const result: PostType | null = await prisma.post.findUnique({
                where: {
                    postId: postId,
                }
            })
            return res.status(200).json({ message: "post get success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null });
    }
})

router.get('/list/:authorId', async (req: Request, res: Response) => {
    try {
        let authorId = req.params.authorId ?? '';
        if(authorId) {
            const result: {title: string, content: string, checked: boolean}[] = await prisma.post.findMany({
                select: {
                    postId: true,
                    title: true,
                    content: true,
                    checked: true,
                },
                where: {
                    authorId: authorId,
                },
            })
            return res.status(200).json({ message: "post get list success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed", result: null });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error", result: null });
    }
})

module.exports = router;