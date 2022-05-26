import { Box, Text } from 'grommet';
import React from 'react';

const PageNotFound: React.FC = () => {
    return (
        <Box flex align='center' justify='center'>
            <Text size='xxlarge' weight='bold' color='contrast'>
               Error 404
            </Text>
            <Text size='xxlarge' weight='bold'>
                Página não encontrada!
            </Text>
        </Box>
    );
}

export default PageNotFound;