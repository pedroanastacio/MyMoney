import { ICredit } from './ICredit'
import { IDebt } from './IDebt'

export interface IBillingCycle {
    _id: string
    name: string
    month: number
    year: number
    credits: Partial<ICredit>[]
    debts: Partial<IDebt>[]
}

