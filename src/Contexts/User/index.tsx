import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    userId: '' ,
    sessionId: '',
    logging: false,
    setUserId: (userId: string): void => {},
    setSessionId: (sessionId: string): void => {},
    setLogging: (logging: boolean): void => {},
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: Props) => {
    const [userId, setUserId] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>('');
    const [logging, setLogging] = useState<boolean>(false);

    useEffect(() => {
        if(userId) localStorage.setItem('userId', userId);
        else localStorage.removeItem('userId');
    }, [userId])

    useEffect(() => {
        if(sessionId) localStorage.setItem('sessionId', sessionId);
        else localStorage.removeItem('logging'); 
    }, [sessionId])

    useEffect(() => {
        if(logging) localStorage.setItem('logging', logging ? 'true' : 'false') 
        else localStorage.removeItem('logging'); 
    }, [logging])

    return (
        <UserContext.Provider value={ { userId, sessionId, logging, setUserId, setSessionId, setLogging } }>
            { children }
        </UserContext.Provider>
    );
}