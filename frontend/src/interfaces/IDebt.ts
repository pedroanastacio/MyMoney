export interface IDebt {
    _id: string
    name: string
    value: number
    status: DebtStatus
}

export enum DebtStatus {
    pago = 'PAGO',
    pendente = 'PENDENTE',
    agendado = 'AGENDADO',
}