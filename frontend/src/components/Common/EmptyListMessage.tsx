import React from 'react';
import { Text } from 'grommet';

type EmptyListMessageProps = {
  children: string
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = (props) => {
  return (
    <Text
      alignSelf='center'
      size='large'
      textAlign='center'
    >
      {props.children}
    </Text>
  );
}

export default EmptyListMessage;