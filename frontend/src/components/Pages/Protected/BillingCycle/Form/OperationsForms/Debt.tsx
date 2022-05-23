import React, { useCallback, useContext } from 'react';
import { Box, Button, FormField, ResponsiveContext, Select, Text } from 'grommet';
import { Add } from 'grommet-icons';
import { Control, Controller, FieldError, useFieldArray, UseFormRegister } from 'react-hook-form';
import { IBillingCycle } from '../../../../../../interfaces/IBillingCycle';
import { DebtStatus, IDebt } from '../../../../../../interfaces/IDebt';
import ResponsiveGrid from '../../../../../Common/ResponsiveGrid';
import OperationsFormsActions from './Actions';
import OperationsFormsTitle from './Title';
import FormError from '../../../../../Common/FormError';

type DebtFormsProps = {
    register: UseFormRegister<Partial<IBillingCycle>>
    control: Control<Partial<IBillingCycle>, any>
    readOnly?: boolean
    errors: {
        _id?: FieldError | undefined;
        name?: FieldError | undefined;
        value?: FieldError | undefined;
        status?: FieldError | undefined;
    }[] | undefined
}

const DebtForms: React.FC<DebtFormsProps> = (props) => {

    const size = useContext(ResponsiveContext);
    const { fields, append, insert, remove } = useFieldArray({
        control: props.control,
        name: 'debts'
    });

    const handleAddClick = useCallback((): void => {
        append({ name: '', value: 0, status: DebtStatus.pendente });
    }, [append]);

    const handleDuplicateClick = useCallback((index: number, item: Partial<IDebt>): void => {
        insert(index, { name: item.name, value: item.value, status: item.status });
    }, [insert])

    const handleDeleteClick = useCallback((index: number): void => {
        remove(index);
    }, [remove]);

    const rowsNumber = useCallback((): number => {
        if (size === 'xsmall')
            return 4;

        return 1;
    }, [size])

    return (
        <Box margin={{ top: 'medium' }}>
            <OperationsFormsTitle>
                Débitos
            </OperationsFormsTitle>
            {fields.length ?
                <Box tag='ul' style={{ 'listStyleType': 'none', padding: '0px', margin: '0px' }}>
                    {fields.map((item, index) => (
                        <Box tag='li' key={index}>
                            <ResponsiveGrid
                                rows={Array(rowsNumber()).fill('flex')}
                                columns={Array(12).fill('flex')}
                                gap='xsmall'
                                areas={{
                                    xsmall: [
                                        { name: 'box1', start: [0, 0], end: [11, 0] },
                                        { name: 'box2', start: [0, 1], end: [11, 1] },
                                        { name: 'box3', start: [0, 2], end: [11, 2] },
                                        { name: 'box4', start: [0, 3], end: [11, 3] }
                                    ],
                                    small: [
                                        { name: 'box1', start: [0, 0], end: [2, 0] },
                                        { name: 'box2', start: [3, 0], end: [5, 0] },
                                        { name: 'box3', start: [6, 0], end: [8, 0] },
                                        { name: 'box4', start: [9, 0], end: [11, 0] }
                                    ],
                                    medium: [
                                        { name: 'box1', start: [0, 0], end: [3, 0] },
                                        { name: 'box2', start: [4, 0], end: [6, 0] },
                                        { name: 'box3', start: [7, 0], end: [8, 0] },
                                        { name: 'box4', start: [9, 0], end: [11, 0] }
                                    ],
                                    large: [
                                        { name: 'box1', start: [0, 0], end: [2, 0] },
                                        { name: 'box2', start: [3, 0], end: [5, 0] },
                                        { name: 'box3', start: [6, 0], end: [8, 0] },
                                        { name: 'box4', start: [9, 0], end: [11, 0] }
                                    ],
                                }}
                            >
                                <Box gridArea='box1'>
                                    <FormField
                                        readOnly={props.readOnly ?? false}
                                        label='Nome'
                                        placeholder='Informe o nome'
                                        {...props.register(`debts.${index}.name`)}
                                    />
                                    <FormError>{props.errors?.[index]?.name?.message!}</FormError>
                                </Box>
                                <Box gridArea='box2'>
                                    <FormField
                                        readOnly={props.readOnly ?? false}
                                        label='Valor (R$)'
                                        placeholder='Informe o valor'
                                        type='number'
                                        step='0.01'
                                        {...props.register(`debts.${index}.value`)}
                                    />
                                    <FormError>{props.errors?.[index]?.value?.message!}</FormError>
                                </Box>
                                <Box gridArea='box3'>
                                    <Box
                                        border={{
                                            color: '#647072',
                                            size: 'xsmall',
                                            style: 'solid',
                                            side: 'bottom'
                                        }}
                                        margin={{ bottom: 'small'}}
                                    >
                                        <Text
                                            weight={600}
                                            margin={{ top: '6px', bottom: '0px', horizontal: '11px' }}
                                        >
                                            Status
                                        </Text>
                                        <Controller
                                            name={`debts.${index}.status`}
                                            control={props.control}
                                            render={({ field }) =>
                                                <Select
                                                    {...field}
                                                    plain
                                                    options={[
                                                        DebtStatus.pago,
                                                        DebtStatus.pendente,
                                                        DebtStatus.agendado
                                                    ]}
                                                />
                                            }
                                        />
                                    </Box>
                                    <FormError>{props.errors?.[index]?.status?.message!}</FormError>
                                </Box>
                                <OperationsFormsActions
                                    index={index}
                                    item={item}
                                    disabled={props.readOnly ?? false}
                                    gridArea='box4'
                                    onAddClick={handleAddClick}
                                    onDuplicateClick={handleDuplicateClick}
                                    onDeleteClick={handleDeleteClick}
                                />
                            </ResponsiveGrid>
                        </Box>
                    ))}
                </Box>
                :
                <Button
                    secondary
                    label='Novo'
                    icon={<Add />}
                    onClick={handleAddClick}
                />
            }
        </Box>
    )
}

export default DebtForms;