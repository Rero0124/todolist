const SET_USER = "user/SET_USER" as const;
const REMOVE_USER = "user/REMOVE_USER" as const;

export const setUser = (userInfo: UserState) => ({
    type: SET_USER,
    payload: userInfo,
});

export const removeUser = () => ({
    type: REMOVE_USER
});

export type UserState = {
    userId: string;
    sessionId: string;
    logging: boolean;
};

type UserAction = 
    | ReturnType<typeof setUser>
    | ReturnType<typeof removeUser>;

const initState: UserState = {
    userId: localStorage.getItem('userId') ?? '',
    sessionId: localStorage.getItem('sessionId') ?? '',
    logging: localStorage.getItem('logging') === 'true' ? true : false,
}

const user = (
    state: UserState = initState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case SET_USER:
            state = action.payload;
            localStorage.setItem('userId', state.userId);
            localStorage.setItem('sessionId', state.sessionId);
            localStorage.setItem('logging', state.logging ? 'true' : 'false');
            return state;
        case REMOVE_USER:
            state = { userId: '', sessionId: '', logging: false };
            localStorage.removeItem('userId');
            localStorage.removeItem('sessionId');
            localStorage.removeItem('logging');
            return state;
        default:
            return state;
    }
}

export default user;