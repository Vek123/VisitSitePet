import React, { useEffect } from "react";


interface PageNameInterface {
    name: string,
}

function PageName(props: PageNameInterface) {
    let [clWidth, setClWidth] = React.useState(document.documentElement.clientHeight);
    useEffect(() => {
        window.addEventListener("resize", () => setClWidth(document.documentElement.clientHeight));
    }, []);
    return (
        <div className="page-name" style={{width: clWidth}}>{props.name}</div>
    );
}

export default PageName
