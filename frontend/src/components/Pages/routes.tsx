import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BillingCycle from './Protected/BillingCycle';
import Dashboard from './Protected/Dashboard';
import ProtectedLayout from './Protected';
import Profile from './Protected/Profile';
import PublicLayout from './Public';
import Login from './Public/Login';
import CreateAccount from './Public/CreateAccount';
import PageNotFound from './NotFound';
import ForgotPassword from './Public/ForgotPassword';
import ResetPassword from './Public/ResetPassword';
import ChangePassword from './Protected/ChangePassword';

const Pages = () => {

  return (
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='create-account' element={<CreateAccount />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path='' element={<Dashboard />} />
          <Route path='register'>
            <Route path='billing-cycle' element={<BillingCycle />} />
          </Route>
          <Route path='profile' element={<Profile />} />
          <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
  );
}

export default Pages;