import React, { useContext } from 'react';
import { Box, Button, ResponsiveContext } from 'grommet';
import { AddCircle, Duplicate, Trash } from 'grommet-icons';
import { ICredit } from '../../../../../../interfaces/ICredit';
import { IDebt } from '../../../../../../interfaces/IDebt';
import { isSizeSmall } from '../../../../../../utils/isSizeSmall';

type OperationsFormsActionsProps = {
  index: number
  item: Partial<ICredit | IDebt>
  disabled?: boolean
  gridArea?: string
  onAddClick: () => void
  onDuplicateClick: (index: number, item: Partial<ICredit | IDebt>) => void
  onDeleteClick: (index: number) => void
}

const OperationsFormsActions: React.FC<OperationsFormsActionsProps> = (props) => {

  const size = useContext(ResponsiveContext);

  return (
    <Box
      direction='row'
      gridArea={props.gridArea}
      justify={isSizeSmall(size) ? 'center' : 'start'}
    >
      <Button
        icon={<AddCircle color='secondary-light' />}
        onClick={props.onAddClick}
        disabled={props.disabled ?? false}
      />
      <Button
        icon={<Duplicate color='secondary-light' />}
        onClick={() => props.onDuplicateClick(props.index, props.item)}
        disabled={props.disabled ?? false}
      />
      <Button
        icon={<Trash color='secondary-light' />}
        onClick={() => props.onDeleteClick(props.index)}
        disabled={props.disabled ?? false}
      />
    </Box>
  );
}

export default OperationsFormsActions;