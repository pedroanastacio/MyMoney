import { Table, TableBody, TableCell, TableHeader, TableRow, Text } from 'grommet';
import React from 'react';
import { IBillingCycle } from '../../../../../../interfaces/IBillingCycle';
import { IPaginateList } from '../../../../../../interfaces/IPaginatedList';
import BillingCycleTableActions from './Actions';

type BillingCycleTableProps = {
    list: IPaginateList<IBillingCycle>
    onEditClick: (item: IBillingCycle) => void
    onDeleteClick: (item: IBillingCycle) => void
}

interface IColumns {
    property: 'name' | 'month' | 'year' | 'actions'
    header: string
}

const COLUMNS: IColumns[] = [
    {
        property: 'name',
        header: 'Nome'
    },
    {
        property: 'month',
        header: 'Mês'
    },
    {
        property: 'year',
        header: 'Ano'
    },
    {
        property: 'actions',
        header: 'Ações'
    }
]

const BillingCycleTable: React.FC<BillingCycleTableProps> = (props) => {

    return (
        <>
            <Table className='grommet-table'>
                <TableHeader>
                    <TableRow>
                        {COLUMNS.map(col => (
                            <TableCell key={col.property}>
                                <Text>{col.header}</Text>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.list.items.map(item => (
                        <TableRow key={item._id}>
                            {COLUMNS.map(col => (
                                col.property === 'actions' ?
                                    <TableCell key={col.property}>
                                        <BillingCycleTableActions
                                            item={item}
                                            onEditClick={props.onEditClick}
                                            onDeleteClick={props.onDeleteClick}
                                        />
                                    </TableCell>
                                    :
                                    <TableCell key={col.property}>
                                        <Text>{item[col.property]}</Text>
                                    </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default BillingCycleTable;