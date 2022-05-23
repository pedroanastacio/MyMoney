import { Box, Button } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import React from 'react';
import { IBillingCycle } from '../../../../../../interfaces/IBillingCycle';
import ListItemField from './Field';

type ListItemProps = {
  item: IBillingCycle
  onEditClick: (item: IBillingCycle) => void
  onDeleteClick: (item: IBillingCycle) => void
}

const BillingCycleListITem: React.FC<ListItemProps> = (props) => {

  return (
    <Box
      tag='li'
      border={{
        color: 'primary',
        size: 'xsmall',
        style: 'solid',
        side: 'bottom'
      }}
      pad='medium'
      key={props.item._id}
    >
      <ListItemField label='Nome' value={props.item.name!} />
      <ListItemField label='Mês' value={props.item.month!} />
      <ListItemField label='Ano' value={props.item.year!} />
      <Box direction='row' justify='center'>
        <Button
          icon={<Edit color='secondary-light' />}
          onClick={() => props.onEditClick(props.item)}
        />
        <Button
          icon={<Trash color='secondary-light' />}
          onClick={() => props.onDeleteClick(props.item)}
        />
      </Box>
    </Box>
  );
}

export default BillingCycleListITem;