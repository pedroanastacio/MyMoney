import { Box, ResponsiveContext } from 'grommet';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectLoggedIn } from '../../../store/Auth/selectors';
import { isSizeSmall } from '../../../utils/isSizeSmall';

const PublicLayout: React.FC = () => {

  const size = useContext(ResponsiveContext);
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn)
    return <Navigate to='/' replace={true} />

  return (
    <Box
      flex
      justify='center'
      align='center'
      pad='small'
    >
      <Box
        background='contrast'
        pad={isSizeSmall(size) ? 'large' : 'medium'}
        fill
        style={{ maxWidth: '400px' }}
        border={{
          style: 'solid',
          size: 'xsmall',
          color: 'primary'
        }}
      >
        <Outlet />
      </Box>
    </Box>

  );
}

export default PublicLayout;