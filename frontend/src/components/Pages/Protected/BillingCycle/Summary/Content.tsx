import React, { useCallback } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import ResponsiveGrid from '../../../../Common/ResponsiveGrid';

type SummaryProps = {
    children: React.ReactNode
}

const SummaryContent: React.FC<SummaryProps> = (props) => {

    const rowsNumber = useCallback((size: string): number => {
        switch (size) {
            case 'xsmall':
                return 3;
            case 'small':
                return 2;
            default:
                return 1;
        }
    }, []);

    return (
        <Box flex align='center'>
            <Box fill style={{ maxWidth: '1200px' }}>
                <ResponsiveContext.Consumer>
                    {size => (
                        <ResponsiveGrid
                            rows={Array(rowsNumber(size)).fill('flex')}
                            columns={Array(12).fill('flex')}
                            gap='medium'
                            style={{ justifyContent: 'center' }}
                            areas={{
                                xsmall: [
                                    { name: 'valueBox1', start: [0, 0], end: [11, 0] },
                                    { name: 'valueBox2', start: [0, 1], end: [11, 1] },
                                    { name: 'valueBox3', start: [0, 2], end: [11, 2] }
                                ],
                                small: [
                                    { name: 'valueBox1', start: [0, 0], end: [5, 0] },
                                    { name: 'valueBox2', start: [6, 0], end: [11, 0] },
                                    { name: 'valueBox3', start: [3, 1], end: [8, 1] }
                                ],
                                medium: [
                                    { name: 'valueBox1', start: [0, 0], end: [3, 0] },
                                    { name: 'valueBox2', start: [4, 0], end: [7, 0] },
                                    { name: 'valueBox3', start: [8, 0], end: [11, 0] }
                                ],
                                large: [
                                    { name: 'valueBox1', start: [0, 0], end: [3, 0] },
                                    { name: 'valueBox2', start: [4, 0], end: [7, 0] },
                                    { name: 'valueBox3', start: [8, 0], end: [11, 0] }
                                ],
                            }}
                        >
                            {props.children}
                        </ResponsiveGrid>
                    )}
                </ResponsiveContext.Consumer>
            </Box>
        </Box>
    );
}

export default SummaryContent;