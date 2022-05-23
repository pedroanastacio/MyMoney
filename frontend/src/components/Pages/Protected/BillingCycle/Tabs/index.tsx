import React, { useContext }from 'react';
import RenderIf from '../../../../Common/RenderIf';
import { Box, ResponsiveContext, Tab as GTab } from 'grommet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { isSizeSmall } from '../../../../../utils/isSizeSmall';

type TabProps = {
    children: React.ReactNode
    title: string
    icon: JSX.Element
    id: string
}

const Tab: React.FC<TabProps> = (props) => {

    const { enabledTabs } = useSelector((state: RootState) => state.tabs);
    const size = useContext(ResponsiveContext);

    return (
        <RenderIf test={enabledTabs[props.id]}>
            <Box pad={{ 'vertical': isSizeSmall(size) ? 'small' : '0px' }}>
                <GTab
                    title={props.title}
                    icon={props.icon}
                    className='grommet-tab'
                >
                    {props.children}
                </GTab>
            </Box>
        </RenderIf>
    )
}

export default Tab;