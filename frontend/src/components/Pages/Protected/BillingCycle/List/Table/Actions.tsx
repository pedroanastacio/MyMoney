import { Box, Button } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import React from 'react';
import { IBillingCycle } from '../../../../../../interfaces/IBillingCycle';

type BillingCycleTableActionsProps = {
  item: IBillingCycle
  onEditClick: (item: IBillingCycle) => void
  onDeleteClick: (item: IBillingCycle) => void
}

const BillingCycleTableActions: React.FC<BillingCycleTableActionsProps> = (props) => {
  return (
    <Box direction='row'>
    <Button
        icon={<Edit color='secondary-light' />}
        onClick={() => props.onEditClick(props.item)}
    />
    <Button
        icon={<Trash color='secondary-light' />}
        onClick={() => props.onDeleteClick(props.item)}
    />
</Box>
  );
}

export default BillingCycleTableActions;