import { Box } from 'grommet';
import React from 'react';
import { IBillingCycle } from '../../../../../../interfaces/IBillingCycle';
import { IPaginateList } from '../../../../../../interfaces/IPaginatedList';
import ListITem from './Item';

type BillingCycleMobileListProps = {
    list: IPaginateList<IBillingCycle>
    onEditClick: (item: IBillingCycle) => void
    onDeleteClick: (item: IBillingCycle) => void
}

const BillingCycleMobileList: React.FC<BillingCycleMobileListProps> = (props) => {
    return (
        <Box
            tag='ul'
            background='contrast'
            style={{ 'listStyleType': 'none', padding: '0px', margin: '0px' }}
        >
            {props.list.items.map(item => (
                <ListITem
                    item={item}
                    key={item._id}
                    onEditClick={props.onEditClick}
                    onDeleteClick={props.onDeleteClick}
                />
            ))}
        </Box>
    );
}

export default BillingCycleMobileList;