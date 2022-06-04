import { Box, Button, Form, FormField, ResponsiveContext, Spinner, TextInput } from 'grommet';
import { Edit, Lock } from 'grommet-icons';
import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isSizeSmall } from '../../../../utils/isSizeSmall';
import PageTitle from '../../../Common/PageTitle';
import FormError from '../../../Common/FormError';
import * as yup from 'yup';
import { IUser } from '../../../../interfaces/IUser';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserService from '../../../../services/user';
import { AppDispatch } from '../../../../store';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../../../store/Auth/selectors';
import { showErrorToast } from '../../../../utils/showErrorToast';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório'),
});

const Profile: React.FC = () => {

  const size = useContext(ResponsiveContext);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserState);
  const [updating, setUpdating] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<IUser>>({
    resolver: yupResolver(schema),
    defaultValues: { name: user?.name }
  });

  const onUpdateClick = handleSubmit(async (data: Partial<IUser>) => {
    setUpdating(true);

    try {
      await dispatch(UserService.update(data)).unwrap();
      toast.success('Nome alterado com sucesso');
    } catch (error: any) {
      showErrorToast(error);
    } finally {
      setUpdating(false);
    }
  });

  return (
    <Box align='center'>
      <PageTitle title='Perfil' />
      <Box
        fill
        background='contrast'
        align='center'
        pad={isSizeSmall(size) ? 'large' : 'medium'}
        margin={{ top: 'medium' }}
        style={{ maxWidth: '600px' }}
      >
        <Form style={{ width: '100%' }} onSubmit={onUpdateClick}>
          <Box direction='row' fill>
            <Box fill>
              <FormField
                label='Nome'
                placeholder='Informe o nome'
                {...register('name')}
                fill
              />
              <FormError>{errors.name?.message!}</FormError>
            </Box>
            <Button
              type='submit'
              primary
              disabled={updating}
              color='primary'
              icon={updating ? <Spinner color='contrast' size='xsmall' /> : <Edit color='contrast' />}
              margin={{ left: 'medium', bottom: '12px' }}
              style={{ height: '36px' }}
              alignSelf='end'
            />
          </Box>
        </Form>
        <FormField
          label='E-mail'
          style={{ width: '100%' }}
        >
          <TextInput
            placeholder='Informe o e-mail'
            disabled
            value={user?.email}
          />
        </FormField>
        <Button
          label='Alterar senha'
          secondary
          icon={<Lock color='secondary-light' />}
          margin={{ top: 'medium' }}
          onClick={() => navigate('/change-password')}
        />
      </Box>
    </Box>
  );
}

export default Profile;