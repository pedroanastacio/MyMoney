import { Box } from 'grommet';
import React from 'react';

type PageContentProps = {
  children: React.ReactNode
}

const PageContent: React.FC<PageContentProps> = (props) => {
  return (
      <Box pad='small'>
          {props.children}
      </Box>
  );
}

export default PageContent;