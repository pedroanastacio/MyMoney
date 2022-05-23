import React from 'react';
import { Grommet, Box } from 'grommet';
import Theme from './Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import Pages from './components/Pages/routes';

function App() {

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
          <Pages />
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
