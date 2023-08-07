import express, { Request, Response } from 'express';
import { prisma } from '..';

interface UserType {
	userId: string;
	userPw?: string;
    salt: string;
    sessionId?: string | null;
}

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        let userInfo: UserType = req.body ?? {userId: '', userPw: '', salt: '', sessionId: null};
        if(userInfo.userId) {
            const result: UserType = await prisma.user.create({
                data: {
                    userId: userInfo.userId,
                    userPw: userInfo.userPw ?? '',
                    salt: userInfo.salt,
                    sessionId: userInfo.sessionId,
                },
            })
            return res.status(200).json({ message: "user create success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.put('/', async (req: Request, res: Response) => {
    try {
        let userInfo: UserType = req.body ?? {userId: '', userPw: '', salt: '', sessionId: null};
        if(userInfo.userId) {
            const result: UserType = await prisma.user.update({
                data: {
                    userPw: userInfo.userPw,
                    salt: userInfo.salt,
                },
                where: {
                    userId: userInfo.userId,
                },
            })
            return res.status(200).json({ message: "user update success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.patch('/', async (req: Request, res: Response) => {
    try {
        let userId = req.body.userId ?? '';
        let sessionId = req.body.sessionId ?? '';
        if(userId && sessionId) {
            const result: UserType = await prisma.user.update({
                data: {
                    sessionId: sessionId,
                },
                where: {
                    userId: userId,
                },
            })
            return res.status(200).json({ message: "user update sessionId success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/:userId', async (req: Request, res: Response) => {
    try {
        let userId = req.params.userId;
        if(userId) {
            const result: UserType | null = await prisma.user.findUnique({
                select: {
                    userId: true,
                    salt: true,
                },
                where: {
                    userId: userId,
                },
            })
            return res.status(200).json({ message: "post get success", result: result });
        } else {
            return res.status(400).json({ message: "verification failed" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        let userInfo: UserType = req.body ?? {userId: '', userPw: '', salt: '', sessionId: null};
        if(userInfo.userId) {
            const result: UserType | null = await prisma.user.findFirst({
                where: {
                    userId: userInfo.userId,
                    userPw: userInfo.userPw,
                },
            })
            if(result) {
                return res.status(200).json({ message: "user login success", result: result});
            } else {
                return res.status(200).json({ message: "user login fail" });
            }
        } else {
            return res.status(400).json({ message: "verification failed" });
        }
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;