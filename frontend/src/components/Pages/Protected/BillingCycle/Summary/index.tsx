import { Atm, CreditCard, Currency } from 'grommet-icons';
import React from 'react';
import ValueBox from './ValueBox';
import SummaryContent from './Content';

type SummaryProps = {
    credit: number,
    debt: number
}

const Summary: React.FC<SummaryProps> = (props) => {

    return (
        <SummaryContent>
            <ValueBox
                gridArea='valueBox1'
                value={props.credit}
                text='Total de Créditos'
            >
                <Atm color='secondary' size='xlarge' />
            </ValueBox>
            <ValueBox
                gridArea='valueBox2'
                value={props.debt}
                text='Total de Débitos'
            >
                <CreditCard color='secondary' size='xlarge' />
            </ValueBox>
            <ValueBox
                gridArea='valueBox3'
                value={props.credit - props.debt}
                text='Valor Consolidado'
            >
                <Currency color='secondary' size='xlarge' />
            </ValueBox>
        </SummaryContent>
    );
}

export default Summary;