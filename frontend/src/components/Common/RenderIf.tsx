import React from 'react';

type RenderIfProps = {
    children: React.ReactNode
    test: boolean
}

const RenderIf: React.FC<RenderIfProps> = (props) => {
    return(
        <>
        {props.test ? props.children : false}
        </>
    )
}

export default RenderIf;