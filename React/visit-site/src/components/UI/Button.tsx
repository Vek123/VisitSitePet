import React from "react";


type ButtonProps = {
    className: string;
    link?: string;
    text: string;
    reversed?: boolean;
    handleClick?: () => void;
}

export default function Button(props: ButtonProps) {
    let classes: string[] = ["button"];
    if (props.reversed) {
        classes.push("button--reversed");
    }
    if (props.className) {
        classes.push(props.className);
    }

    return (
        <>
            {props.link ? (
                <a className={classes.join(" ")} href={props.link}>
                    {props.text}
                </a>
            ) : (
                <button className={classes.join(" ")} onClick={props.handleClick}>
                    {props.text}
                </button>
            )}
        </>
    );
}