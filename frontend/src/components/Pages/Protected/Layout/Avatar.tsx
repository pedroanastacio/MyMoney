import React, { useRef, useState } from 'react';
import { Box, Button, Drop, Text } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../../../../store/Auth/selectors';
import { ContactInfo, Logout } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../store';
import { AuthSlice } from '../../../../store/Auth/slice';
import { DashboardSlice } from '../../../../store/Dashboard/slice';
import { BillingCycleSlice } from '../../../../store/BillingCycle/slice';

const Avatar: React.FC = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUserState);
    const targetRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [showDrop, setShowDrop] = useState<boolean>(false);

    const handleLogoutClick = () => {
        dispatch(AuthSlice.actions.logout());
        dispatch(DashboardSlice.actions.reset());
        dispatch(BillingCycleSlice.actions.reset());
        navigate('/login', { replace: true });
    }

    return (
        <>
            <Box
                background='contrast'
                ref={targetRef}
                onClick={() => setShowDrop(!showDrop)}
                focusIndicator={false}
                justify='center'
                align='center'
                height='2.5rem'
                width='2.5rem'
            >
                <Text weight={600}>
                    {user?.name.charAt(0).toUpperCase()}
                </Text>
            </Box>
            {showDrop && (
                <Drop
                    align={{ top: 'bottom', right: 'right' }}
                    target={targetRef.current}
                    onClickOutside={() => setShowDrop(false)}
                    background='contrast-light'
                    style={{ zIndex: 1000 }}
                >
                    <Box pad='xsmall'>
                        <Button
                            label='Perfil'
                            justify='start'
                            icon={<ContactInfo color='primary' />}
                            onClick={() => navigate('/profile')}
                        />
                        <Button
                            label='Sair'
                            justify='start'
                            icon={<Logout color='primary' />}
                            onClick={handleLogoutClick}
                        />
                    </Box>
                </Drop>
            )}
        </>
    )
}

export default Avatar;