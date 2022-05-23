import { Box, Text } from 'grommet';
import React from 'react';
import { convertToReal } from '../../../../../utils/currency';

type ValueBoxProps = {
    children: React.ReactNode
    gridArea: string
    borderColor?: string
    value: number
    text: string
}

const ValueBox: React.FC<ValueBoxProps> = (props) => {
    return (
        <Box
            direction='row'
            gridArea={props.gridArea}
            background='contrast'
            border={{ color: props.borderColor ?? 'primary', size: 'xsmall' }}
            pad={{ vertical: '0', left: 'medium', right: 'small' }}
            style={{ position: 'relative' }}
            height='98px'
        >
            <Box
                flex
                justify='center'
                style={{ zIndex: 1 }}
            >
                <Text
                    size='xlarge'
                    weight='bolder'
                >
                    {convertToReal(props.value)}
                </Text>
                <Text color='secondary-light'>{props.text}</Text>
            </Box>
            <Box style={{ position: 'absolute', zIndex: 0, right: '12px' }}>
                {props.children}
            </Box>
        </Box>
    );
}

export default ValueBox;