interface UserState {
    username: string;
}

interface RootState {
    user: UserState;
}

export const selectUser = (state: RootState): UserState => state.user;