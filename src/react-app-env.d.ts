/// <reference types="react-scripts" />
declare namespace NodeJS {
	interface ProcessEnv {
    	NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_DB_URL: string;
        REACT_APP_DB_USER: string;
        REACT_APP_DB_PASSWORD: string;
        REACT_APP_DB_DATABASE: string;
        REACT_APP_IV_KEY: string;
        REACT_APP_SECRET_KEY: string;
	}
}

interface UserType {
	id: string;
	pw: string;
    salt: string;
}

interface CryptoType {
    str: string;
    salt: string;
}

interface PostType {
    postId: int
	title: string
	content: string	
	authorId: string
}