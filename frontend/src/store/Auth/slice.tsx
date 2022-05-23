import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { IAuthState } from '../../interfaces/IAuthState';
import AuthService from '../../services/auth';
import { toast } from 'react-toastify';

const authKey = 'my-money-auth'
const initialState: IAuthState = {
    refreshToken: localStorage.getItem(authKey),
    accessToken: null,
    user: null,//{ _id: '234234', name: 'Teste da Teste Silva', email: 'teste@teste.com' }, //null
    authenticating: false
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            AuthService.logout();
            localStorage.removeItem(authKey);
            state = initialState;
        },
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
                toast.error(action.payload as string);
            })

        }
})