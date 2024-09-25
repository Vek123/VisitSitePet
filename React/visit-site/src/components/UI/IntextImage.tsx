import React from "react";

interface IntextImageInterface {
    image: string,
    text: JSX.Element,
    flex: boolean,
}

function IntextImage(props: IntextImageInterface) {
    let elClass = props.flex ? "intext-image intext-image--flex" : "intext-image"
    return (
        <div className={elClass}>
            <div className="intext-image__image"><img src={props.image} alt="My self" /></div>
            <div className="intext-image__text">{props.text}</div>
        </div>
    );
}

export default IntextImage;