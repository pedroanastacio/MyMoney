import React, { useCallback, useEffect } from 'react';
import { Box } from 'grommet';
import { Atm, CreditCard, Currency } from 'grommet-icons';
import 'react-loading-skeleton/dist/skeleton.css';
import PageContent from '../../../Common/PageContent';
import PageTitle from '../../../Common/PageTitle';
import ValueBox from '../BillingCycle/Summary/ValueBox';
import { useSelector, useDispatch } from 'react-redux';
import { ISummary } from '../../../../interfaces/ISummary';
import { selectSummary } from '../../../../store/Dashboard/selectors';
import { AppDispatch, RootState } from '../../../../store';
import DashboardService from '../../../../services/dashboard';
import LoadingBox from './LoadingBox';
import { RequestStatus } from '../../../../interfaces/ISummaryState';
import SummaryContent from '../BillingCycle/Summary/Content';

const Dashboard: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const summary: ISummary = useSelector(selectSummary);
  const summaryStatus: RequestStatus = useSelector((state: RootState) => state.dashboard.status);

  useEffect(() => {
    if (summaryStatus === 'idle') dispatch(DashboardService.fetchSummary());
  }, [summaryStatus, dispatch]);

  const renderLoading = useCallback((): JSX.Element => (
    <>
      <LoadingBox gridArea='valueBox1' />
      <LoadingBox gridArea='valueBox2' />
      <LoadingBox gridArea='valueBox3' />
    </>
  ), []);

  const renderBoxes = useCallback((): JSX.Element => (
    <>
      <ValueBox
        gridArea='valueBox1'
        value={summary.credit}
        text='Total de Créditos'
      >
        <Atm color='secondary' size='xlarge' />
      </ValueBox>
      <ValueBox
        gridArea='valueBox2'
        value={summary.debt}
        text='Total de Débitos'
      >
        <CreditCard color='secondary' size='xlarge' />
      </ValueBox>
      <ValueBox
        gridArea='valueBox3'
        value={summary.consolidated ?? summary.credit - summary.debt}
        text='Valor Consolidado'
      >
        <Currency color='secondary' size='xlarge' />
      </ValueBox>
    </>
  ), [summary]);

  const renderContent = useCallback((): JSX.Element => {
    if (summaryStatus === 'succeeded')
      return renderBoxes();
    else
      return renderLoading();
  }, [summaryStatus, renderBoxes, renderLoading]);

  return (
    <Box>
      <PageTitle title='Dashboard' small='Versão 1.0' />
      <PageContent>
        <SummaryContent>
          {renderContent()}
        </SummaryContent>
      </PageContent>
    </Box>
  );
}

export default Dashboard;