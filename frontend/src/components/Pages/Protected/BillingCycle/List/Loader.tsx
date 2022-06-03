import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const BillingCycleListLoader: React.FC = () => {
    return (
        <>
            <Skeleton height={50} />
            <Skeleton height={575} />
        </>
    );
}

export default BillingCycleListLoader;