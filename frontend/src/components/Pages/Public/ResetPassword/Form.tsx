import { Box, Button, Form, FormField, ResponsiveContext, Spinner, Text } from 'grommet';
import { LinkPrevious, Lock } from 'grommet-icons';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSizeSmall } from '../../../../utils/isSizeSmall';
import FormError from '../../../Common/FormError';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IResetPasswordForm } from '../../../../interfaces/IResetPasswordForm';
import { toast } from 'react-toastify';
import { showErrorToast } from '../../../../utils/showErrorToast';

type ResetPasswordFormProps = {
    submit: (data: IResetPasswordForm) => Promise<void>
    previousRoute: string
}

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

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
    
    const size = useContext(ResponsiveContext);
    const navigate = useNavigate();
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
            await props.submit(data);
            toast.success('Senha alterada com sucesso');
            navigate(props.previousRoute);
        } catch (error: any) {
            showErrorToast(error);
        } finally {
            setLoading(false);
        }
    });

    return (
        <>
            <Text
                color='secondary-light'
                size='large'
                margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}
                alignSelf='center'
            >
                Alterar senha
            </Text>
            <Form style={{ width: '100%' }} onSubmit={onSubmit}>
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
                        onClick={() => navigate(props.previousRoute)}
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

export default ResetPasswordForm;