import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBillingCycle } from '../interfaces/IBillingCycle';

class BillingCycleService {

    public fetchBillingCycles = createAsyncThunk('billingCycle/fetchBillingCycles', async (_, { rejectWithValue }) => {
        try {
            const { data: billingCycles } = await api.get('/billing-cycle');
            return billingCycles;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public createBillingCycle = createAsyncThunk('billingCycle/createBillingCycle', async (data: Partial<IBillingCycle>, { rejectWithValue }) => {
        try {
            const { data: createdBillingCycle } = await api.post('/billing-cycle', data);
            return createdBillingCycle;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public updateBillingCycle = createAsyncThunk('billingCycle/updateBillingCycle', async (data: Partial<IBillingCycle>, { rejectWithValue }) => {
        try {
            const { data: updatedBillingCycle } = await api.put(`/billing-cycle/${data._id}`, data);
            return updatedBillingCycle;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
    );

    public fetchBillingCycleById = createAsyncThunk('billingCycle/fetchBillingCycleById', async (id: string, { rejectWithValue }) => {
        try {
            const { data: billingCycle } = await api.get(`/billing-cycle/${id}`);
            return billingCycle;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

    public deleteBillingCycle = createAsyncThunk('billingCycle/deleteBillingCycle', async (data: Partial<IBillingCycle>, { rejectWithValue }) => {
        try {
            const { data: deletedBillingCycle } = await api.delete(`/billing-cycle/${data._id}`);
            return deletedBillingCycle;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });
}

const billingCycleService = new BillingCycleService();
export default billingCycleService;