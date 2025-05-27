type User = {
    username: string;
    role: string;
};

export const setUserDetails = (dispatch: any) => (user: User) => {
    dispatch({
        type: 'SET_USER_DETAILS',
        payload: user
    });
};

