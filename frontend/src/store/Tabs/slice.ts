import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TABS } from '../../components/Pages/Protected/BillingCycle';
import { ITabs } from '../../interfaces/ITabs';
import { ITabsState } from '../../interfaces/ITabsState';

const initialState: ITabsState = {
    activeIndex: 0,
    enabledTabs: {}
}

export const TabsSlice = createSlice({
    name: 'tabs',
    initialState: initialState,
    reducers: {
        setActiveIndex: (state, { payload: index }: PayloadAction<number>) => {
            state.activeIndex = index;
        },
        setEnabledTabs: (state, { payload: tabsIds }: PayloadAction<string[]>) => {
            const tabsToShow: ITabs = {};
            tabsIds.forEach(tab => tabsToShow[tab] = true);
            state.enabledTabs = tabsToShow;
        },
        reset: (state) => {
            state.activeIndex = TABS.list.index;
            state.enabledTabs = { 
                [TABS.list.id]: true,
                [TABS.add.id]: true
            }
        }
    }
})