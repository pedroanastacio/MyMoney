import React from 'react';
import { Box } from 'grommet';
import Skeleton from 'react-loading-skeleton';

type LoadingBoxProps = {
    gridArea: string
}

const LoadingBox: React.FC<LoadingBoxProps> = (props) => {
    return (
        <Box
            gridArea={props.gridArea}
        >
            <Skeleton height={100}/>
        </Box>
    );
}

export default LoadingBox;