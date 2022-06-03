import { IBillingCycle } from './IBillingCycle';
import { IPaginateList } from './IPaginatedList';
import { RequestStatus } from './ISummaryState';

export interface IBillingCycleState {
    list: IPaginateList<IBillingCycle>
    formData: Partial<IBillingCycle>
    status: RequestStatus
    error: string | null
}