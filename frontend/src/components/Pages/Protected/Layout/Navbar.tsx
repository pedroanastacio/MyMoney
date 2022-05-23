import React, { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { Menu } from 'grommet-icons';
import Avatar from './Avatar';
import { isSizeSmall } from '../../../../utils/isSizeSmall';
import Logo from '../../../Common/Logo';

type NavbarProps = {
    showSidebar: boolean
    setShowSidebar: (state: boolean) => void
}

const Navbar: React.FC<NavbarProps> = (props) => {

    const size = useContext(ResponsiveContext);

    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            background='primary'
            pad={{
                left: 'medium',
                right: 'small',
                vertical: isSizeSmall(size) ? '11px' : '7px'
            }}
            style={{ position: 'sticky', top: 0, zIndex: 999 }}
        >
            <Box direction='row' align='center'>
                <Menu
                    style={{ marginRight: '24' }}
                    color='contrast'
                    onClick={() => props.setShowSidebar(!props.showSidebar)}
                />
                <Logo />
            </Box>
            {!isSizeSmall(size) ? <Avatar /> : false}
        </Box>
    );
}

export default Navbar;