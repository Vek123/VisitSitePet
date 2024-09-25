import React from "react";

import PageName from '../UI/PageName';


interface ApiComProps {
    pageName: string,
}


export default function ApiCom(props: ApiComProps) {
    return(
        <>
            <PageName name={props.pageName}/>
            <div className="api-com">

            </div>
        </>
    )
}