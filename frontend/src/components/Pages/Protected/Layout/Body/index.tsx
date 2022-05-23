import { Box, Collapsible } from 'grommet';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

type BodyProps = {
    showSidebar: boolean
}

const Body: React.FC<BodyProps> = (props) => {

    const outlet = useOutlet();

    return (
        <Box flex direction='row'>
            <Collapsible direction='horizontal' open={props.showSidebar}>
                <Sidebar />
            </Collapsible>
            <Box flex>
                <Box
                    tag='main'
                    pad='small'
                    style={{ minHeight: `calc(100vh - 100px)` }}
                >
                 {outlet}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default Body;