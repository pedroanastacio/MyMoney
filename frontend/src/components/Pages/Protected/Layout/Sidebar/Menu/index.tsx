import { Box } from 'grommet';
import { ChapterAdd, Currency, Dashboard } from 'grommet-icons';
import React from 'react';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { useLocation } from 'react-router-dom';

const MenuItems = {
    items: [
        {
            key: 'dashboard',
            name: 'Dashboard',
            path: '/'
        }
    ],
    register: [
        {
            key: 'billing-cycle',
            name: 'Ciclos de pagamentos',
            path: '/register/billing-cycle'
        }
    ]
}

const Menu: React.FC = () => {

    const { pathname } = useLocation();
    
    const renderMenuItems = MenuItems.items.map(item => (
        <MenuItem
            key={item.key}
            label={item.name}
            icon={<Dashboard color={pathname !== item.path ? 'primary' : 'contrast'} />}
            path={item.path}
        />
    ))

    const renderRegisterSubMenu = MenuItems.register.map(item => (
        <MenuItem
            key={item.key}
            label={item.name}
            icon={<Currency color={pathname !== item.path ? 'primary' : 'contrast'} />}
            path={item.path}
            padLeft='medium'
        />
    ))

    return (
        <Box fill>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {renderMenuItems}
                <SubMenu
                    key='register'
                    label='Cadastrar'
                    icon={<ChapterAdd color='primary' />}
                    items={MenuItems.register}
                >
                    {renderRegisterSubMenu}
                </SubMenu>
            </ul>
        </Box>
    );
}

export default Menu;