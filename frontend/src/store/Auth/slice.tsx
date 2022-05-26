import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { IAuthState } from '../../interfaces/IAuthState';
import AuthService from '../../services/auth';
import { showErrorToast } from '../../utils/showErrorToast';

export const authKey = 'my-money-auth';
const initialState: IAuthState = {
    refreshToken: localStorage.getItem(authKey),
    accessToken: null,
    user: null,//{ _id: '234234', name: 'Teste da Teste Silva', email: 'teste@teste.com' }, //null
    authenticating: true
}

const resetAuthState = async (state: IAuthState) => {
    localStorage.removeItem(authKey);
    state.refreshToken = null;
    state.accessToken = null;
    state.user = null;
    state.authenticating = false;
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            resetAuthState(state);
        },
        setAuthenticating: (state) => {
            state.authenticating = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(AuthService.login.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                localStorage.setItem(authKey, action.payload.refresh_token);
                state.refreshToken = action.payload.refresh_token;
                state.accessToken = action.payload.access_token;
                state.user = action.payload.user;
            })
            .addCase(AuthService.login.rejected, (state, action) => {
                showErrorToast(action.payload as string);
            })
            .addCase(AuthService.authenticateWithRefreshToken.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                localStorage.setItem(authKey, action.payload.refresh_token);
                state.refreshToken = action.payload.refresh_token;
                state.accessToken = action.payload.access_token;
                state.user = action.payload.user;
                state.authenticating = false;
            })
            .addCase(AuthService.authenticateWithRefreshToken.rejected, (state, action) => {
                resetAuthState(state);
            })
    }
})