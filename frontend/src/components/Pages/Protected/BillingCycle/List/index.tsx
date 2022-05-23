import React, { useCallback, useContext, useEffect } from 'react';
import { Box, Table, ResponsiveContext, TableHeader, TableRow, TableCell, Text, TableBody, Button } from 'grommet';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import BillingCycleService from '../../../../../services/billingCycle';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import ListITem from './Item';
import { Edit, Trash } from 'grommet-icons';
import { IBillingCycle } from '../../../../../interfaces/IBillingCycle';
import { TabsSlice } from '../../../../../store/Tabs/slice';
import { TABS } from '..';
import { BillingCycleSlice } from '../../../../../store/BillingCycle/slice';

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

const BillingCycleList: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const { list, status } = useSelector((state: RootState) => state.billingCycle);
    const size = useContext(ResponsiveContext);

    useEffect(() => {
        if (status === 'idle') dispatch(BillingCycleService.fetchBillingCycles());
    }, [status, dispatch]);

    const handleEditClick = useCallback((item: IBillingCycle): void => {
        dispatch(BillingCycleSlice.actions.setFormData(item));
        dispatch(TabsSlice.actions.setEnabledTabs([TABS.edit.id]));
        dispatch(TabsSlice.actions.setActiveIndex(TABS.edit.index));
    }, [dispatch]);

    const handleDeleteClick = useCallback((item: IBillingCycle): void => {
        dispatch(BillingCycleSlice.actions.setFormData(item));
        dispatch(TabsSlice.actions.setEnabledTabs([TABS.remove.id]));
        dispatch(TabsSlice.actions.setActiveIndex(TABS.remove.index));
    }, [dispatch]);

    const renderActions = useCallback((item: IBillingCycle): JSX.Element => (
        <Box direction='row'>
            <Button
                icon={<Edit color='secondary-light' />}
                onClick={() => handleEditClick(item)}
            />
            <Button
                icon={<Trash color='secondary-light' />}
                onClick={() => handleDeleteClick(item)}
            />
        </Box>
    ), [handleDeleteClick, handleEditClick]);

    const renderTable = useCallback((): JSX.Element => (
        <Box background='contrast'>
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
                    {list.map(item => (
                        <TableRow key={item._id}>
                            {COLUMNS.map(col => (
                                col.property === 'actions' ?
                                    <TableCell key={col.property}>{renderActions(item)}</TableCell>
                                    :
                                    <TableCell key={col.property}>
                                        <Text>{item[col.property]}</Text>
                                    </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    ), [list, renderActions]);

    const renderList = useCallback((): JSX.Element => (
        <Box
            tag='ul'
            background='contrast'
            style={{ 'listStyleType': 'none', padding: '0px', margin: '0px' }}
        >
            {list.map(item => (
                <ListITem
                    item={item}
                    key={item._id}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            ))}
        </Box>
    ), [list, handleEditClick, handleDeleteClick]);

    const renderLoading = useCallback((): JSX.Element => (
        <>
            <Skeleton height={50} />
            <Skeleton height={250} />
        </>
    ), []);

    const renderContent = useCallback((): JSX.Element => {
        if (status === 'succeeded' && size !== 'xsmall')
            return renderTable();
        else if (status === 'succeeded')
            return renderList();
        else
            return renderLoading();
    }, [status, size, renderLoading, renderList, renderTable]);

    return (
        <>
            {renderContent()}
        </>

    );
}

export default BillingCycleList;