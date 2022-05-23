import { Box, ResponsiveContext } from 'grommet';
import React from 'react';
import { isSizeSmall } from '../../../../../utils/isSizeSmall';
import Menu from './Menu';
import UserActions from './UserActions';

const Sidebar: React.FC = () => {

    return (
        <ResponsiveContext.Consumer>
            {size => (
                <Box
                    width='230px'
                    background='contrast'
                    align='start'
                    justify='start'
                    flex
                    style={
                        isSizeSmall(size) ?
                            {
                                position: 'fixed',
                                top: '54px',
                                left: 0,
                                bottom: 0,
                                zIndex: 999
                            } : {}
                    }
                >
                    {isSizeSmall(size) ? <UserActions /> : false}
                    <Menu />
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
}

export default Sidebar;