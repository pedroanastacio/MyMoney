import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

type ResponsiveGridProps = {
    areas: any
}

const ResponsiveGrid: React.FC<ResponsiveGridProps & any> = ({ areas, ...props }) => {

    const size = useContext(ResponsiveContext);

    return (
        <Grid
            responsive={true}
            areas={areas[size]}
            {...props}
        >
            {props.children}
        </Grid>
    );
}

export default ResponsiveGrid;