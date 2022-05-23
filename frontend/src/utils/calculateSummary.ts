import { ICredit } from '../interfaces/ICredit';
import { IDebt } from '../interfaces/IDebt';

export const calculateSummary = (operations: Partial<ICredit>[] | Partial<IDebt>[]): number => {
    return operations.map(o => +o.value!).reduce(sum);
}

const sum = (previousValue: number, currentValue: number) => previousValue + currentValue;