import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 5000;
const cors = require('cors');
export const prisma = new PrismaClient();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript + Node.js + Express Server');
});

app.use('/post', require('./router/post'));
app.use('/user', require('./router/user'));

app.listen(port, () => {
	console.log(`[server]: Server is running at <https://localhost>:${port}`);
});