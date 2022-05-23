import { IBillingCycle } from './IBillingCycle';
import { RequestStatus } from './ISummaryState';

export interface IBillingCycleState {
    list: IBillingCycle[]
    formData: Partial<IBillingCycle>
    status: RequestStatus
    error: string | null
}