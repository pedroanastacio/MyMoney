import { Box, Button, Form, FormField, ResponsiveContext, Spinner, Text } from 'grommet';
import React, { useContext, useState } from 'react';
import { isSizeSmall } from '../../../utils/isSizeSmall';
import Logo from '../../Common/Logo';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinkPrevious, Lock } from 'grommet-icons';
import AuthService from '../../../services/auth';
import { toast } from 'react-toastify';
import { showErrorToast } from '../../../utils/showErrorToast';
import { IResetPasswordForm } from '../../../interfaces/IResetPasswordForm';
import FormError from '../../Common/FormError';

const schema = yup.object({
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(12, 'A senha deve ter no máximo 12 caracteres')
        .required('A senha é obrigatória'),
    confirmPassword: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(12, 'A senha deve ter no máximo 12 caracteres')
        .required('A confirmação de senha é obrigatória')
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
})

const ResetPassword: React.FC = () => {

    const size = useContext(ResponsiveContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const forgotPasswordToken = searchParams.get('token');
    const userId = searchParams.get('id');
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = handleSubmit(async (data: IResetPasswordForm) => {
        setLoading(true);

        try {
            await AuthService.resetPassword({
                user_id: userId!,
                forgot_password_token: forgotPasswordToken!,
                password: data.password
            });
            toast.success('Senha alterada com sucesso');
            navigate('/login');
        } catch (error: any) {
            showErrorToast(error);
        } finally {
            setLoading(false);
        }
    });

    return (
        <>
            <Box align='center' margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}>
                <Logo color='primary' />
            </Box>
            <Text
                color='secondary-light'
                size='large'
                margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}
                alignSelf='center'
            >
                Alterar senha
            </Text>
            <Form onSubmit={onSubmit}>
                <FormField
                    type='password'
                    label='Senha'
                    placeholder='Informe a senha'
                    {...register('password')}
                />
                <FormError>{errors.password?.message!}</FormError>
                <FormField
                    type='password'
                    label='Confirmar senha'
                    placeholder='Informe a senha'
                    {...register('confirmPassword')}
                />
                <FormError>{errors.confirmPassword?.message!}</FormError>
                <Box
                    justify='end'
                    direction='row'
                    margin={{ top: isSizeSmall(size) ? 'large' : 'medium' }}
                >
                    <Button
                        label='Voltar'
                        secondary
                        icon={<LinkPrevious color='secondary-light' />}
                        margin={{ right: 'small' }}
                        onClick={() => navigate('/login')}
                    />
                    <Button
                        type='submit'
                        label='Alterar senha'
                        primary
                        disabled={loading}
                        color='primary'
                        icon={loading ? <Spinner color='contrast' size='xsmall' /> : <Lock color='contrast' />}
                    />
                </Box>
            </Form>
        </>
    );
}

export default ResetPassword;