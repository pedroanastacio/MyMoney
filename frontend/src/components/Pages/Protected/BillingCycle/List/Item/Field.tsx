import React from 'react';
import { Box, Text } from 'grommet';

type ListItemFieldProps = {
    label: string
    value: string | number
}

const ListItemField: React.FC<ListItemFieldProps> = (props) => {
    return (
        <Box margin={{ 'bottom': 'medium' }}>
            <Text
                color='primary'
                weight='bold'
                margin={{ 'bottom': '2px' }}
            >
                {props.label}
            </Text>
            <Text size='1rem'>
                {props.value}
            </Text>
        </Box>
    );
}

export default ListItemField;