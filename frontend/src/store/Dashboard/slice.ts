import { createSlice } from '@reduxjs/toolkit';
import { ISummaryState, RequestStatus } from '../../interfaces/ISummaryState';
import DashboardService from '../../services/dashboard';
import { toast } from 'react-toastify';

const initialState: ISummaryState = {
    summary: { credit: 0, debt: 0 },
    status: RequestStatus.idle,
    error: null
}

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(DashboardService.fetchSummary.pending, (state, action) => {
                state.status = RequestStatus.loading;
            })
            .addCase(DashboardService.fetchSummary.fulfilled, (state, action) => {
                state.status = RequestStatus.succeeded;
                state.summary = action.payload;
            })
            .addCase(DashboardService.fetchSummary.rejected, (state, action) => {
                state.status = RequestStatus.failed;
                state.error = action.payload as string;
                toast.error(state.error);
            })
    }
})