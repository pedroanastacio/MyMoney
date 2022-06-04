import { Box, ResponsiveContext } from 'grommet';
import React, { useContext } from 'react';
import { isSizeSmall } from '../../../../utils/isSizeSmall';
import Logo from '../../../Common/Logo';
import { useSearchParams } from 'react-router-dom';
import AuthService from '../../../../services/auth';
import { IResetPasswordForm } from '../../../../interfaces/IResetPasswordForm';
import ResetPasswordForm from './Form';

const ResetPassword: React.FC = () => {

    const size = useContext(ResponsiveContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const forgotPasswordToken = searchParams.get('token');
    const userId = searchParams.get('id');

    const handleSubmit = async (data: IResetPasswordForm) => {
        await AuthService.resetPassword({
            user_id: userId!,
            forgot_password_token: forgotPasswordToken!,
            password: data.password
        });
    }

    return (
        <>
            <Box align='center' margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}>
                <Logo color='primary' />
            </Box>
            <ResetPasswordForm
                submit={handleSubmit}
                previousRoute='/login'
            />
        </>
    );
}

export default ResetPassword;