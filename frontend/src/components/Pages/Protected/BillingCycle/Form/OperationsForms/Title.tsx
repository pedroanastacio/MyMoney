import React from 'react';
import { Text } from 'grommet';

type OperationsFormsTitleProps = {
    children: string
}

const OperationsFormsTitle: React.FC<OperationsFormsTitleProps> = (props) => {
    return (
        <Text
            color='primary'
            weight={700}
            margin={{ left: '11px', bottom: 'small' }}
        >
            {props.children}
        </Text>
    );
}

export default OperationsFormsTitle;