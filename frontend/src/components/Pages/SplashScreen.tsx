import { Box } from 'grommet';
import React from 'react';
import Logo from '../Common/Logo';

const SplashScreen: React.FC = () => {
    return (
        <Box flex align='center' justify='center'>
           <Logo color='contrast' />
        </Box>
    );
}

export default SplashScreen;