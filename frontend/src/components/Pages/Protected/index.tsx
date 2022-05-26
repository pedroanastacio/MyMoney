import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedIn } from '../../../store/Auth/selectors';
import Body from './Layout/Body';
import Navbar from './Layout/Navbar';

const ProtectedLayout: React.FC = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(window.innerWidth > 900);
    const loggedIn = useSelector(selectLoggedIn);

    if(!loggedIn)
        return <Navigate to='/login' replace={true} />

    return (
        <>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Body showSidebar={showSidebar} />
        </>
    );
}

export default ProtectedLayout;