import React from 'react';
import { Box } from 'grommet';

type TabContentProps = {
    children: React.ReactNode
}

const TabContent: React.FC<TabContentProps> = (props) => {
  return (
      <Box margin={{ 'top': 'small' }}>
          {props.children}
      </Box>
  );
}

export default TabContent;