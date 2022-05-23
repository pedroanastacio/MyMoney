import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IBillingCycle } from '../../interfaces/IBillingCycle';
import { IBillingCycleState } from '../../interfaces/IBillingCycleState';
import { RequestStatus } from '../../interfaces/ISummaryState';
import BillingCycleService from '../../services/billingCycle';

const initialState: IBillingCycleState = {
    list: [],
    formData: {
        name: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        credits: [],
        debts: []
    },
    status: RequestStatus.idle,
    error: null
}

export const BillingCycleSlice = createSlice({
    name: 'tabs',
    initialState: initialState,
    reducers: {
        setFormData: (state, { payload: formData }: PayloadAction<Partial<IBillingCycle>>) => {
            state.formData = formData;
        },
        resetForm: (state) => {
            state.formData = initialState.formData
        }
    },
    extraReducers(builder) {
        builder
            .addCase(BillingCycleService.fetchBillingCycles.pending, (state, action) => {
                state.status = RequestStatus.loading;
            })
            .addCase(BillingCycleService.fetchBillingCycles.fulfilled, (state, action) => {
                state.status = RequestStatus.succeeded;
                state.list = action.payload;
            })
            .addCase(BillingCycleService.fetchBillingCycles.rejected, (state, action) => {
                state.status = RequestStatus.failed;
                state.error = action.payload as string;
                toast.error(state.error);
            })
            .addCase(BillingCycleService.createBillingCycle.fulfilled, (state, action) => {
                state.list.push(action.payload);
                toast.success('Ciclo de pagamento salvo!');
            })
            .addCase(BillingCycleService.createBillingCycle.rejected, (state, action) => {
                toast.error(action.payload as string);
            })
            .addCase(BillingCycleService.fetchBillingCycleById.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(BillingCycleService.fetchBillingCycleById.rejected, (state, action) => {
                toast.error(action.payload as string);
            })
            .addCase(BillingCycleService.updateBillingCycle.fulfilled, (state, action) => {
                state.list = state.list.map(item => item._id === action.payload._id ?
                    { ...item, ...action.payload } :
                    item
                );
                toast.success('Ciclo de pagamento atualizado!');
            })
            .addCase(BillingCycleService.updateBillingCycle.rejected, (state, action) => { 
                toast.error(action.payload as string);
            })
            .addCase(BillingCycleService.deleteBillingCycle.fulfilled, (state, action) => {
                state.list = state.list.filter(item => item._id !== action.payload._id);
                toast.success('Ciclo de pagamento removido!');
            })
            .addCase(BillingCycleService.deleteBillingCycle.rejected, (state, action) => {
                toast.error(action.payload as string);
            })
    }
})