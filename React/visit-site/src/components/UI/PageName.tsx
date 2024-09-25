import React from "react";


interface PageNameInterface {
    name: string,
}

function PageName(props: PageNameInterface) {
    return (
        <div className="page-name">{props.name}</div>
    );
}

export default PageName
