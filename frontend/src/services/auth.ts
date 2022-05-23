import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';

class AuthService {

    public logout = async () => {
        await api.post('/auth/logout');
    }

    public login = createAsyncThunk('auth/login', async (data: Partial<IUser>, { rejectWithValue }) => {
        try {
            const { data: userData } = await api.post(`/auth/login`, data);
            return userData;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public createUser = async (data: Partial<IUser>) => {
        await api.post('/user', data);
    }
}

const authService = new AuthService();
export default authService;