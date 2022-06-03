import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Pagination, PaginationProps, ResponsiveContext } from 'grommet';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import BillingCycleService from '../../../../../services/billingCycle';
import { IBillingCycle } from '../../../../../interfaces/IBillingCycle';
import { TabsSlice } from '../../../../../store/Tabs/slice';
import { TABS } from '..';
import { BillingCycleSlice } from '../../../../../store/BillingCycle/slice';
import { useSearchParams } from 'react-router-dom';
import { handlePaginationParams } from '../../../../../utils/handlePaginationParams';
import EmptyListMessage from '../../../../Common/EmptyListMessage';
import BillingCycleListLoader from './Loader';
import BillingCycleMobileList from './MobileList';
import BillingCycleTable from './Table';

const BillingCycleList: React.FC = () => {

    const size = useContext(ResponsiveContext);
    const dispatch: AppDispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<number>(handlePaginationParams(searchParams.get('page')!, 1));
    const limit = handlePaginationParams(searchParams.get('limit')!, 10);
    const { list, status } = useSelector((state: RootState) => state.billingCycle);

    useEffect(() => {
        if (status === 'idle') dispatch(BillingCycleService.fetchBillingCycles({ page, limit }));
    }, [status, dispatch, page, limit]);

    const handlePaginationClick = useCallback(({ page }: PaginationProps) => {
        setPage(page!);
        setSearchParams({
            page: page!.toString(),
            limit: limit.toString()
        })
        dispatch(BillingCycleService.fetchBillingCycles({ page: page!, limit }));
    }, [dispatch, limit, setSearchParams]);

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

    const renderTableOrList = useCallback((): JSX.Element => {
        if (size !== 'xsmall')
            return (
                <BillingCycleTable
                    list={list}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            );
        else
            return (
                <BillingCycleMobileList
                    list={list}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                />
            );
    }, [handleDeleteClick, handleEditClick, list, size])

    const renderContent = useCallback((): JSX.Element => {
        if (status === 'succeeded') {
            if (list.count === 0)
                return <EmptyListMessage>Nenhum ciclo de pagamento encontrado</EmptyListMessage>;
            else
                return (
                    <Box background='contrast'>
                        {renderTableOrList()}
                        <Pagination
                            alignSelf='center'
                            margin={{ vertical: 'medium' }}
                            size='small'
                            numberItems={list.count}
                            onChange={handlePaginationClick}
                            page={page}
                        />
                    </Box>
                );
        }
        else
            return <BillingCycleListLoader />;
    }, [status, list.count, renderTableOrList, handlePaginationClick, page]);

    return (
        <>
            {renderContent()}
        </>
    );
}

export default BillingCycleList;