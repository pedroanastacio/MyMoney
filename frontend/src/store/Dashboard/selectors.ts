import { createSelector } from 'reselect';
import { RootState } from '../index';

const selectSummaryState = (state: RootState) => state.dashboard.summary;

export const selectSummary = createSelector(
	[selectSummaryState],
	summary => ({ ...summary, consolidated: summary.credit - summary.debt })
);

