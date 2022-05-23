import { Box, Button, Collapsible } from 'grommet';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IMenuItem } from '../../../../../../interfaces/IMenuItem';

type SubMenuProps = {
    children: React.ReactNode
    label: string
    icon: JSX.Element | undefined
    items: IMenuItem[]
}

const SubMenu: React.FC<SubMenuProps> = (props) => {   

    const { pathname } = useLocation();
    const [open, setOpen] = useState<boolean>(props.items.some(item => item.path === pathname));

    return (
        <li>
            <Box background={open ? 'contrast-light' : 'transparent'}>
                <Button
                    justify='start'
                    icon={props.icon}
                    label={props.label}
                    color='primary'
                    style={{
                        borderRadius: '0',
                        padding: '15px 10px',
                        fontSize: '.95rem'
                    }}
                    onClick={() => setOpen(!open)}
                />
                <Collapsible open={open} >
                    <Box>
                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                            {props.children}
                        </ul>
                    </Box>
                </Collapsible>
            </Box>
        </li>
    );
}

export default SubMenu;