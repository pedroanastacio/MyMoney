import React, { useContext } from 'react';
import { IResetPasswordForm } from '../../../../interfaces/IResetPasswordForm';
import ResetPasswordForm from '../../Public/ResetPassword/Form';
import userService from '../../../../services/user';
import { isSizeSmall } from '../../../../utils/isSizeSmall';
import { Box, ResponsiveContext } from 'grommet';

const ChangePassword: React.FC = () => {

    const size = useContext(ResponsiveContext);

    const handleSubmit = async (data: IResetPasswordForm) => {
        await userService.changePassword({ password: data.password });
    }

    return (
        <Box align='center'>
            <Box
                fill
                background='contrast'
                align='center'
                pad={isSizeSmall(size) ? 'large' : 'medium'}
                margin={{ top: 'medium' }}
                style={{ maxWidth: '400px' }}
            >
                <ResetPasswordForm
                    submit={handleSubmit}
                    previousRoute='/profile'
                />
            </Box>
        </Box>
    );
}

export default ChangePassword;