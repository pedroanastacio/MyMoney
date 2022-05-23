import React from 'react';
import { Box, Text } from 'grommet';

const Footer: React.FC = () => {
    return (
        <Box
            tag='footer'
            pad='small'
            align='center'
            justify='center'
            background='primary-dark'
        >
            <Text color='secondary-light' size='small'>
                Copyright &copy; 2022
            </Text>
        </Box>
    );
}

export default Footer;