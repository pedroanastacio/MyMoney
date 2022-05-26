import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, Form, FormField, ResponsiveContext, Spinner } from 'grommet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IBillingCycle } from '../../../../../interfaces/IBillingCycle';
import FormError from '../../../../Common/FormError';
import { Close, Save } from 'grommet-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { TabsSlice } from '../../../../../store/Tabs/slice';
import ResponsiveGrid from '../../../../Common/ResponsiveGrid';
import { useSelector } from 'react-redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import { isSizeSmall } from '../../../../../utils/isSizeSmall';
import CreditForms from './OperationsForms/Credit';
import DebtForms from './OperationsForms/Debt';
import { DebtStatus } from '../../../../../interfaces/IDebt';
import Summary from '../Summary';
import { calculateSummary } from '../../../../../utils/calculateSummary';

type BillingCycleFormProps = {
    actionLabel?: string
    actionIcon?: JSX.Element
    actionColor?: string
    action: AsyncThunk<any, Partial<IBillingCycle>, {}>
    readOnly?: boolean
}

const schema = yup.object({
    name: yup
        .string()
        .required('O nome é obrigatório'),
    month: yup
        .number()
        .positive('O mês deve ser um número positivo')
        .integer('O mês deve ser um número inteiro')
        .min(1, 'O mês deve ser um número entre 1 e 12')
        .max(12, 'O mês deve ser um número entre 1 e 12')
        .required('O mês é obrigatório'),
    year: yup
        .number()
        .positive('O ano deve ser um número positivo')
        .integer('O ano deve ser um número inteiro')
        .min(2000, 'O ano deve ser um número entre 2000 e 2100')
        .max(2100, 'O ano deve ser um número entre 2000 e 2100')
        .required('O ano é obrigatório'),
    credits: yup.array().of(
        yup.object().shape({
            name: yup
                .string()
                .required('O nome é obrigatório'),
            value: yup
                .number()
                .moreThan(0, 'O valor deve ser maior que 0')
                .required('O valor é obrigatório'),
        })
    ),
    debts: yup.array().of(
        yup.object().shape({
            name: yup
                .string()
                .required('O nome é obrigatório'),
            value: yup
                .number()
                .moreThan(0, 'O valor deve ser maior que 0')
                .required('O valor é obrigatório'),
            status: yup
                .string()
                .test(
                    'is-debt-status',
                    `O status deve ser ${DebtStatus.pago}, ${DebtStatus.pendente} ou ${DebtStatus.agendado}`,
                    (value) => value === DebtStatus.pago || value === DebtStatus.pendente || value === DebtStatus.agendado
                )
        })
    )
});

const BillingCycleForm: React.FC<BillingCycleFormProps> = (props) => {

    const size = useContext(ResponsiveContext);
    const dispatch: AppDispatch = useDispatch();
    const { formData } = useSelector((state: RootState) => state.billingCycle);
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<Partial<IBillingCycle>>({
        resolver: yupResolver(schema),
        defaultValues: formData
    });

    const sumCredits = watch('credits')?.length ? calculateSummary(watch('credits')!) : 0;
    const sumDebts = watch('debts')?.length ? calculateSummary(watch('debts')!) : 0;

    const onSubmit = handleSubmit(async (data: Partial<IBillingCycle>) => {
        setLoading(true);

        try {
            await dispatch(props.action(data)).unwrap();
            dispatch(TabsSlice.actions.reset());
        } catch {
        } finally {
            setLoading(false);
        }
    });

    const formRowsNumber = useCallback((): number => {
        switch (size) {
            case 'xsmall':
                return 3;
            case 'small':
                return 2;
            default:
                return 1;
        }
    }, [size]);

    const operationsRowsNumber = useCallback((): number => {
        if (size === 'large')
            return 1;

        return 2;
    }, [size])

    return (
        <Box
            background='contrast'
            pad={isSizeSmall(size) ? 'medium' : 'small'}
        >
            <Form onSubmit={onSubmit}>
                <Box margin={{ bottom: isSizeSmall(size) ? 'large' : 'medium' }}>
                    <ResponsiveContext.Consumer>
                        {() => (
                            <>
                                <ResponsiveGrid
                                    rows={Array(formRowsNumber()).fill('flex')}
                                    columns={Array(12).fill('flex')}
                                    gap='xsmall'
                                    margin={{ bottom: isSizeSmall(size) ? 'large' : 'small' }}
                                    areas={{
                                        xsmall: [
                                            { name: 'box1', start: [0, 0], end: [11, 0] },
                                            { name: 'box2', start: [0, 1], end: [11, 1] },
                                            { name: 'box3', start: [0, 2], end: [11, 2] }
                                        ],
                                        small: [
                                            { name: 'box1', start: [0, 0], end: [7, 0] },
                                            { name: 'box2', start: [8, 0], end: [11, 0] },
                                            { name: 'box3', start: [0, 1], end: [3, 1] }
                                        ],
                                        medium: [
                                            { name: 'box1', start: [0, 0], end: [5, 0] },
                                            { name: 'box2', start: [6, 0], end: [8, 0] },
                                            { name: 'box3', start: [9, 0], end: [11, 0] }
                                        ],
                                        large: [
                                            { name: 'box1', start: [0, 0], end: [4, 0] },
                                            { name: 'box2', start: [5, 0], end: [6, 0] },
                                            { name: 'box3', start: [7, 0], end: [8, 0] }
                                        ],
                                    }}
                                >
                                    <Box gridArea='box1'>
                                        <FormField
                                            readOnly={props.readOnly ?? false}
                                            label='Nome'
                                            placeholder='Informe o nome'
                                            {...register('name')}
                                        />
                                        <FormError>{errors.name?.message!}</FormError>
                                    </Box>
                                    <Box gridArea='box2'>
                                        <FormField
                                            readOnly={props.readOnly ?? false}
                                            label='Mês'
                                            placeholder='Informe o mês'
                                            type='number'
                                            {...register('month')}
                                        />
                                        <FormError>{errors.month?.message!}</FormError>
                                    </Box>
                                    <Box gridArea='box3'>
                                        <FormField
                                            readOnly={props.readOnly ?? false}
                                            label='Ano'
                                            placeholder='Informe o ano'
                                            type='number'
                                            {...register('year')}
                                        />
                                        <FormError>{errors.year?.message!}</FormError>
                                    </Box>
                                </ResponsiveGrid>
                                <Summary
                                    credit={sumCredits}
                                    debt={sumDebts}
                                />
                                <ResponsiveGrid
                                    rows={Array(operationsRowsNumber()).fill('fit')}
                                    columns={Array(12).fill('flex')}
                                    gap={size === 'large' ? 'large' : 'xsmall'}
                                    areas={{
                                        xsmall: [
                                            { name: 'box1', start: [0, 0], end: [11, 0] },
                                            { name: 'box2', start: [0, 1], end: [11, 1] }
                                        ],
                                        small: [
                                            { name: 'box1', start: [0, 0], end: [11, 0] },
                                            { name: 'box2', start: [0, 1], end: [11, 1] }
                                        ],
                                        medium: [
                                            { name: 'box1', start: [0, 0], end: [11, 0] },
                                            { name: 'box2', start: [0, 1], end: [11, 1] }
                                        ],
                                        large: [
                                            { name: 'box1', start: [0, 0], end: [5, 0] },
                                            { name: 'box2', start: [6, 0], end: [11, 0] },
                                        ],
                                    }}
                                >
                                    <Box gridArea='box1'>
                                        <CreditForms
                                            register={register}
                                            control={control}
                                            readOnly={props.readOnly}
                                            errors={errors.credits}
                                        />
                                    </Box>
                                    <Box gridArea='box2'>
                                        <DebtForms
                                            register={register}
                                            control={control}
                                            readOnly={props.readOnly}
                                            errors={errors.debts}
                                        />
                                    </Box>
                                </ResponsiveGrid>
                            </>
                        )}
                    </ResponsiveContext.Consumer>
                </Box>
                <Box justify='end' direction='row'>
                    <Button
                        label='Cancelar'
                        secondary
                        icon={<Close color='secondary-light' />}
                        margin={{ 'right': 'small' }}
                        onClick={() => dispatch(TabsSlice.actions.reset())}
                    />
                    <Button
                        type='submit'
                        label={props.actionLabel ?? 'Salvar'}
                        primary
                        disabled={loading}
                        color={props.actionColor ?? 'primary'}
                        icon={loading ? <Spinner color='contrast' size='xsmall' /> : props.actionIcon ?? <Save color='contrast' />}
                    />
                </Box>
            </Form >
        </Box >
    );
}

export default BillingCycleForm;