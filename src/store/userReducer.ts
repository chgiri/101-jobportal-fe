interface Action {
    type: string;
    payload?: {
        username: string;
        role: string;
    };
}


interface UserState {
    username: string | undefined;
    role: string | undefined;
}

const initialState: UserState = {
    username: '',
    role: ''
};

const userReducer = (state: UserState = initialState, action:Action): UserState => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                username: action.payload?.username,
                role: action.payload?.role
            };
        case 'CLEAR_USER_DETAILS':
            return initialState;
        default:
            return state;
    }
};

export default userReducer;