import React, { useState } from 'react';
import { Box, Button, Collapsible, Text } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../../../interfaces/IUser';
import { selectUserState } from '../../../../../store/Auth/selectors';
import MenuItem from './Menu/MenuItem';
import { Logout, ContactInfo } from 'grommet-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../../store';
import { AuthSlice } from '../../../../../store/Auth/slice';
import { DashboardSlice } from '../../../../../store/Dashboard/slice';
import { BillingCycleSlice } from '../../../../../store/BillingCycle/slice';

const UserActions: React.FC = () => {

    const Actions = {
        profile: {
            key: 'profile',
            name: 'Perfil',
            path: '/profile'
        },
        logout: {
            key: 'logout',
            name: 'Sair',
            path: '/logout'
        }
    };

    const { pathname } = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const user: IUser = useSelector(selectUserState)!;
    const firstName = user.name.split(' ').slice(0, 1).join(' ');
    const lastName = user.name.split(' ').slice(-1).join(' ');
    const [open, setOpen] = useState<boolean>(pathname === Actions.profile.path);

    const handleLogoutClick = () => {
        dispatch(AuthSlice.actions.logout());
        dispatch(DashboardSlice.actions.reset());
        dispatch(BillingCycleSlice.actions.reset());
        navigate('/login', { replace: true });
    }

    return (
        <Box
            fill='horizontal'
            align='center'
            pad={{ top: 'medium' }}
            background={open ? 'contrast-light' : 'transparent'}
            style={{ minHeight: 'fit-content' }}
        >
            <Box
                fill='horizontal'
                focusIndicator={false}
                onClick={() => setOpen(!open)}
                align='center'
            >
                <Text>{firstName + ' ' + lastName}</Text>
                <Text color='secondary-light'>{user.email}</Text>
            </Box>
            <Box fill>
                <Collapsible open={open}>
                    <ul style={{ listStyleType: 'none', padding: '0', marginBottom: '0' }}>
                        <MenuItem
                            key={Actions.profile.key}
                            label={Actions.profile.name}
                            icon={<ContactInfo color={pathname !== Actions.profile.path ? 'primary' : 'contrast'} />}
                            path={Actions.profile.path}
                        />
                        <li>
                            <Box>
                                <Button
                                    justify='start'
                                    icon={<Logout color='primary' />}
                                    label={Actions.logout.name}
                                    color={'primary'}
                                    style={{
                                        borderRadius: '8px',
                                        padding: '15px 10px',
                                        fontSize: '.95rem'
                                    }}
                                    onClick={handleLogoutClick}
                                />
                            </Box>
                        </li>
                    </ul>
                </Collapsible>
            </Box>
        </Box>
    );
}

export default UserActions;