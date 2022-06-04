import { createAsyncThunk } from '@reduxjs/toolkit';
import { IResetPasswordForm } from '../interfaces/IResetPasswordForm';
import { IUser } from '../interfaces/IUser';
import api from './api';

class UserService {

    public update = createAsyncThunk('user/update', async (data: Partial<IUser>, { rejectWithValue }) => {
        try {
            const { data: newUser } = await api.put('/user', data);
            return newUser;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public changePassword = async (data: Partial<IResetPasswordForm>) => {
        await api.put('/user/change-password', data);
    }
}

const userService = new UserService();
export default userService;