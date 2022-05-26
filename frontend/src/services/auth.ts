import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';

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
}

const authService = new AuthService();
export default authService;