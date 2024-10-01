import React from "react";


type TextInputProps = {
    className: string,
    name: string,
    placeHolder: string,
    errorMessage: string,
};

export default function TextInput(props: TextInputProps, kwargs: any) {
    return (
        <div className={`text-input ${props.className}`.trim()}>
            <input type="text" className="text-input__input" name={props.name} placeholder=" " {...kwargs}/>
            <div className="text-input__placeholder">{props.placeHolder}</div>
            <div className="text-input__icon"></div>
            <div className="text-input__error-message">{props.errorMessage}</div>
        </div>
    );
}