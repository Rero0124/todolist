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
	};
}

interface UserType {
	userId: string;
	userPw: string;
    salt: string;
    sessionId: string | null;
}

interface PostType {
    postId: number;
	title: string;
	content: string;
    checked: boolean;
	authorId: string;
}

interface CryptoType {
    str: string;
    salt: string;
}

interface clientLocation {
    country_code: string;
    country_name: string;
    city: string;
    postal: string | null;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
}