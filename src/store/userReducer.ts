const initialState = {
    username: '',
    role: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                username: action.payload.username,
                role: action.payload.role
            };
        case 'CLEAR_USER_DETAILS':
            return initialState;
        default:
            return state;
    }
};

export default userReducer;