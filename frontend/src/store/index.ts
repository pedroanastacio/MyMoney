import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './Auth/slice';
import { BillingCycleSlice } from './BillingCycle/slice';
import { DashboardSlice } from './Dashboard/slice';
import { TabsSlice } from './Tabs/slice';

export const store = configureStore({
    reducer: {
        dashboard: DashboardSlice.reducer,
        tabs: TabsSlice.reducer,
        billingCycle: BillingCycleSlice.reducer,
        auth: AuthSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;