import React, { useEffect } from 'react';
import { Grommet, Box } from 'grommet';
import Theme from './Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Pages from './components/Pages/routes';
import { AppDispatch } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthenticating, selectRefreshToken, selectLoggedIn } from './store/Auth/selectors';

import AuthService from './services/auth';
import SplashScreen from './components/Pages/SplashScreen';
import { AuthSlice } from './store/Auth/slice';

function App() {

  const dispatch: AppDispatch = useDispatch();
  const authenticating = useSelector(selectAuthenticating);
  const refreshToken = useSelector(selectRefreshToken);
  const loggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (refreshToken && !loggedIn) {
      dispatch(AuthService.authenticateWithRefreshToken(refreshToken));
    } else {
      dispatch(AuthSlice.actions.setAuthenticating());
    }
  }, []);

  return (
    <Grommet
      theme={Theme}
      full='min'
      background='secondary'
    >
      <SkeletonTheme
        baseColor='#18292c'
        highlightColor='#303f42'
        borderRadius={0}
      >
        <Box fill height={{ min: '100vh' }}>
          {authenticating ? <SplashScreen /> : <Pages />}
        </Box>
      </SkeletonTheme>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        theme='dark'
        limit={3}
      />
    </Grommet >
  );
}

export default App;
