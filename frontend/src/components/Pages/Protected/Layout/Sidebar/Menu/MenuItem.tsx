import { Box, Button } from 'grommet';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatch, useResolvedPath } from 'react-router-dom';

type MenuItemProps = {
    label: string
    icon: JSX.Element | undefined
    path: string
    padLeft?: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {

    let resolved = useResolvedPath(props.path);
    let match = useMatch({ path: resolved.pathname, end: true });

    const navigate = useNavigate();

    return (
        <li>
            <Box
                background={match ? 'primary' : 'transparent'}
                pad={{ left: props.padLeft }}
            >
                <Button
                    justify='start'
                    icon={props.icon}
                    label={props.label}
                    color={match ? 'contrast' : 'primary'}
                    style={{
                        borderRadius: '8px',
                        padding: '15px 10px',
                        fontSize: '.95rem'
                    }}
                    onClick={() => navigate(props.path)}
                />
            </Box>
        </li>
    );
}

export default MenuItem;