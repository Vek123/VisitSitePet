import React from "react";


type TextInputProps = {
    className: string,
    name: string,
    placeHolder: string,
    errorMessage: string,
};

export default function TextArea(props: TextInputProps) {
    let className = `text-area ${props.className}`.trim();
    return (
        <div className={className}>
            <textarea className="text-area__input" rows={7} name={props.name} placeholder=" "/>
            <div className="text-area__placeholder">{props.placeHolder}</div>
            <div className="text-area__icon"></div>
            <div className="text-area__error-message">{props.errorMessage}</div>
        </div>
    );
}