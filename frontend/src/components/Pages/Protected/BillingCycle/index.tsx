import React, { useEffect } from 'react';
import { Box, Tabs } from 'grommet';
import PageContent from '../../../Common/PageContent';
import PageTitle from '../../../Common/PageTitle';
import { AddCircle, Clipboard, Edit, Trash } from 'grommet-icons';
import Tab from './Tabs';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { TabsSlice } from '../../../../store/Tabs/slice';
import BillingCycleList from './List';
import TabContent from './Tabs/Content';
import BillingCycleForm from './Form';
import { useSelector } from 'react-redux';
import { BillingCycleSlice } from '../../../../store/BillingCycle/slice';
import BillingCycleService from '../../../../services/billingCycle';

export const TABS = {
  list: { id: 'tabList', title: 'Listar', index: 0 },
  add: { id: 'tabAdd', title: 'Adicionar', index: 1 },
  edit: { id: 'tabEdit', title: 'Editar', index: 2 },
  remove: { id: 'tabRemove', title: 'Excluir', index: 3 }
}

const BillingCycle: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const { activeIndex } = useSelector((state: RootState) => state.tabs);

  useEffect(() => {
    dispatch(TabsSlice.actions.reset());
  }, [dispatch]);

  useEffect(() => {
    if (activeIndex === TABS.add.index)
      dispatch(BillingCycleSlice.actions.resetForm());
  }, [dispatch, activeIndex])

  return (
    <Box>
      <PageTitle title='Ciclos de pagamentos' small='Cadastro' />
      <PageContent>
        <Tabs
          justify='start'
          flex='grow'
          style={{ width: '100%' }}
          activeIndex={activeIndex}
          onActive={(index) => dispatch(TabsSlice.actions.setActiveIndex(index))}
        >
          <Tab
            title={TABS.list.title}
            id={TABS.list.id}
            icon={<Clipboard />}
          >
            <TabContent>
              <BillingCycleList />
            </TabContent>
          </Tab>
          <Tab
            title={TABS.add.title}
            id={TABS.add.id}
            icon={<AddCircle />}
          >
            <TabContent>
              <BillingCycleForm action={BillingCycleService.createBillingCycle} />
            </TabContent>
          </Tab>
          <Tab
            title={TABS.edit.title}
            id={TABS.edit.id}
            icon={<Edit />}
          >
            <TabContent>
              <BillingCycleForm
                action={BillingCycleService.updateBillingCycle}
                actionLabel='Editar'
                actionIcon={<Edit color='contrast' />}
              />
            </TabContent>
          </Tab>
          <Tab
            title={TABS.remove.title}
            id={TABS.remove.id}
            icon={<Trash />}
          >
            <TabContent>
            <BillingCycleForm
                action={BillingCycleService.deleteBillingCycle}
                actionLabel='Excluir'
                actionIcon={<Trash color='contrast' />}
                actionColor='status-error'
                readOnly={true}
              />
            </TabContent>
          </Tab>
        </Tabs>
      </PageContent>
    </Box>
  );
}

export default BillingCycle;

