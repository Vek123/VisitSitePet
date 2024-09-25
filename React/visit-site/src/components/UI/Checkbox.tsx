import React from "react";


type CheckboxProps = {
    className: string,
    name: string,
    checked: boolean,
    text: string,
    inputId: string,
}

export default function Checkbox(props: CheckboxProps) {
    return (
        <div className={`checkbox ${props.className}`.trim()}>
            <input id={props.inputId} type="checkbox" className="checkbox__input" name={props.name} defaultChecked={props.checked}/>
            <label className="checkbox__label" htmlFor={props.inputId}>
                <div className="checkbox__text">{props.text}</div>
            </label>
        </div>
    );
}