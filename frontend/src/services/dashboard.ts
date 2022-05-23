import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';

class DashboardService {

    public fetchSummary = createAsyncThunk('dashboard/fetchSummary', async (_, { rejectWithValue }) => {
        try {
            const { data: summary } = await api.get('/billing-cycle/summary');
            return summary;
        } catch (error: any) {
            return rejectWithValue(error)
        }
    });
}

const dashboardService = new DashboardService();
export default dashboardService;