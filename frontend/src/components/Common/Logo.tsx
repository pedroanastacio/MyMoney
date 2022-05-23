import React from 'react';
import { Text } from 'grommet';
import { Money } from 'grommet-icons';

type LogoProps = {
    color?: string
}

const Logo: React.FC<LogoProps> = (props) => {
    return (
        <Text
            margin='none'
            size='xlarge'
            weight='bold'
            color={props.color ?? 'contrast'}
            style={{
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Pacifico'
            }}
        >
            <Money style={{ marginRight: '2px' }} color={props.color ?? 'contrast'} />
            MyMoney
        </Text>
    );
}

export default Logo;