import React, { useContext, useState } from 'react';
import { Box, Button, Form, FormField, ResponsiveContext, Spinner, Text } from 'grommet';
import Logo from '../../Common/Logo';
import { isSizeSmall } from '../../../utils/isSizeSmall';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IUser } from '../../../interfaces/IUser';
import FormError from '../../Common/FormError';
import { LinkPrevious, UserAdd } from 'grommet-icons';
import AuthService from '../../../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../../utils/showErrorToast';

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
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
});


const CreateAccount: React.FC = () => {

  const size = useContext(ResponsiveContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<IUser>>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = handleSubmit(async (data: Partial<IUser>) => {
    setLoading(true);

    try {
      await AuthService.createUser(data);
      toast.success('Nova conta criada com sucesso');
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
        Nova conta
      </Text>
      <Form onSubmit={onSubmit}>
        <FormField
          label='Nome'
          placeholder='Informe o nome'
          {...register('name')}
        />
        <FormError>{errors.name?.message!}</FormError>
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
            margin={{ 'right': 'small' }}
            onClick={() => navigate('/login') }
          />
          <Button
            type='submit'
            label='Criar nova conta'
            primary
            disabled={loading}
            color='primary'
            icon={loading ? <Spinner color='contrast' size='xsmall' /> : <UserAdd color='contrast' />}
          />
        </Box>
      </Form>
    </>
  );
}

export default CreateAccount;