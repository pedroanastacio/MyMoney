import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';
import { IForgotPassword } from '../interfaces/IForgotPassword';
import { IResetPassword } from '../interfaces/IResetPassword';

class AuthService {

    public createUser = async (data: Partial<IUser>) => {
        await api.post('/user', data);
    }

    public login = createAsyncThunk('auth/login', async (data: Partial<IUser>, { rejectWithValue }) => {
        try {
            const { data: userData } = await api.post('/auth/login', data);
            return userData;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public authenticateWithRefreshToken = createAsyncThunk('auth/refresh-token', async (refreshToken: string, { rejectWithValue }) => {
        try {
            const { data: authData } = await api.put('/auth/refresh-token', { refresh_token: refreshToken });
            return authData;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public forgotPassword = async (data: IForgotPassword) => {
        await api.post('/auth/forgot-password', data);
    }

    public resetPassword = async (data: IResetPassword) => {
        await api.put('/auth/reset-password', data);
    }
}

const authService = new AuthService();
export default authService;