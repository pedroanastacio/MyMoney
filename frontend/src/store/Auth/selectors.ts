import { RootState } from '../index';

export const selectUserState = (state: RootState) => state.auth.user;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectLoggedIn = (state: RootState) => state.auth.user !== null;
export const selectAuthenticating = (state: RootState) => state.auth.authenticating;
