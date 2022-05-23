import React, { useContext } from 'react';
import { Box, ResponsiveContext, Text } from 'grommet';

type PageTitleProps = {
    title: string
    small?: string
}

const PageTitle: React.FC<PageTitleProps> = (props) => {

    const size = useContext(ResponsiveContext);

    const isXsmall: boolean = size === 'xsmall';

    return (
        <Box direction={isXsmall ? 'column' : 'row'} margin='small'>
            <Text
                margin={{ right: 'small' }}
                color='light-3'
                size='1.65rem'
            >
                {props.title}
            </Text>
            <Text
                color='secondary-light'
                alignSelf={isXsmall ? 'start' : 'end'}
                margin={{ 'top': isXsmall ? '5px' : '0px' }}
            >
                {props.small}
            </Text>

        </Box>
    );
}

export default PageTitle;