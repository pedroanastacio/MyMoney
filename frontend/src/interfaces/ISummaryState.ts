export interface ISummaryState {
    summary: {
        credit: number
        debt: number
        consolidated?: number
    }
    status: RequestStatus
    error: string | null
}

export enum RequestStatus {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
}