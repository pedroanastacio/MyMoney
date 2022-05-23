import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userLoggedIn } from '../../../../store/Auth/selectors';
import Body from './Body';
import Navbar from './Navbar';

const ProtectedLayout: React.FC = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(window.innerWidth > 900);
    const loggedIn = useSelector(userLoggedIn);

    if(!loggedIn)
        return <Navigate to="/login" replace={true} />

    return (
        <>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Body showSidebar={showSidebar} />
        </>
    );
}

export default ProtectedLayout;