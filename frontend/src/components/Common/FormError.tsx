import React from 'react';
import { Text } from 'grommet';

type FormErrorProps = {
    children: string
}


const FormError: React.FC<FormErrorProps> = (props) => {

    return (
        <Text size='.85rem' color='status-error' margin={{ left: '11px' }}>
            {props.children}
        </Text>
    );
}

export default FormError;