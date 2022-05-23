import { RootState } from '../index';

export const selectUserState = (state: RootState) => state.auth.user;
export const userLoggedIn = (state: RootState) => state.auth.user !== null;