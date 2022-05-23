import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Form, FormField, ResponsiveContext, Spinner, Text } from 'grommet';
import { Login as GLogin } from 'grommet-icons';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '../../Common/Logo';
import { IUser } from '../../../interfaces/IUser';
import AuthService from '../../../services/auth';
import FormError from '../../Common/FormError';
import * as yup from 'yup';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { isSizeSmall } from '../../../utils/isSizeSmall';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(12, 'A senha deve ter no máximo 12 caracteres')
    .required('A senha é obrigatória'),
});

const Login: React.FC = () => {

  const size = useContext(ResponsiveContext);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<IUser>>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit(async (data: Partial<IUser>) => {
    setLoading(true);

    try {
      await dispatch(AuthService.login(data)).unwrap();
      navigate('/', { replace: true });
    } catch (error: any) {
      return;
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Box align='center' margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}>
        <Logo color='primary' />
      </Box>
      <Form onSubmit={onSubmit}>
        <FormField
          label='E-mail'
          placeholder='Informe o e-mail'
          {...register('email')}
        />
        <FormError>{errors.email?.message!}</FormError>
        <FormField
          type='password'
          label='Senha'
          placeholder='Informe a senha'
          {...register('password')}
        />
        <FormError>{errors.password?.message!}</FormError>
        <Box margin={{ top: isSizeSmall(size) ? 'large' : 'medium' }}>
          <Button
            type='submit'
            label='Entrar'
            primary
            disabled={loading}
            color='primary'
            icon={loading ? <Spinner color='contrast' size='xsmall' /> : <GLogin color='contrast' />}
          />
        </Box>
      </Form>
      <Box
        direction='row'
        margin={{ top: isSizeSmall(size) ? 'large' : 'medium' }}
        justify='center'
      >
        <Text color='secondary-light'>Não tem conta?</Text>
        <Text
          color='primary'
          margin={{ left: '5px' }}
          style={{
            cursor: 'pointer'
          }}
          onClick={() => navigate('/create-account')}
        >
          Criar conta
        </Text>
      </Box>
    </>
  );
}

export default Login;