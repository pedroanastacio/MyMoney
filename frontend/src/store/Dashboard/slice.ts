import { createSlice } from '@reduxjs/toolkit';
import { ISummaryState, RequestStatus } from '../../interfaces/ISummaryState';
import BillingCycleService from '../../services/billingCycle';
import DashboardService from '../../services/dashboard';
import { showErrorToast } from '../../utils/showErrorToast';

const initialState: ISummaryState = {
    summary: { credit: 0, debt: 0 },
    status: RequestStatus.idle,
    error: null
}

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        reset: (state) => {
            state.summary = initialState.summary;
            state.status = initialState.status;
            state.error = initialState.error;
        }
    },
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
                showErrorToast(state.error);
            })
            .addCase(BillingCycleService.createBillingCycle.fulfilled, (state, action) => {
                state.status = RequestStatus.idle;
            })
            .addCase(BillingCycleService.updateBillingCycle.fulfilled, (state, action) => {
                state.status = RequestStatus.idle;
            })
            .addCase(BillingCycleService.deleteBillingCycle.fulfilled, (state, action) => {
                state.status = RequestStatus.idle;
            })
    }
})