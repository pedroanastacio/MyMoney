import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, FormField, ResponsiveContext, Spinner, Text } from 'grommet';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Common/Logo';
import * as yup from 'yup';
import { isSizeSmall } from '../../../utils/isSizeSmall';
import AuthService from '../../../services/auth';
import { toast } from 'react-toastify';
import { showErrorToast } from '../../../utils/showErrorToast';
import FormError from '../../Common/FormError';
import { LinkPrevious, Send } from 'grommet-icons';
import { IForgotPassword } from '../../../interfaces/IForgotPassword';

const schema = yup.object({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório')
})

const ForgotPassword: React.FC = () => {

  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IForgotPassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = handleSubmit(async (data: IForgotPassword) => {
    setLoading(true);

    try {
      await AuthService.forgotPassword(data);
      toast.success('E-mail de recuperação de senha enviado');
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
        Esqueci minha senha
      </Text>
      <Form onSubmit={onSubmit}>
        <FormField
          label='E-mail'
          placeholder='Informe o e-mail'
          {...register('email')}
        />
        <FormError>{errors.email?.message!}</FormError>
        <Box
          justify='end'
          direction='row'
          margin={{ top: isSizeSmall(size) ? 'large' : 'medium' }}
        >
          <Button
            label='Voltar'
            secondary
            icon={<LinkPrevious color='secondary-light' />}
            margin={{ 'right': 'small' }}
            onClick={() => navigate('/login')}
          />
          <Button
            type='submit'
            label='Enviar'
            primary
            disabled={loading}
            color='primary'
            icon={loading ? <Spinner color='contrast' size='xsmall' /> : <Send color='contrast' />}
          />
        </Box>
      </Form>
    </>
  );
}

export default ForgotPassword;