import React from "react";


type ModalProps = {
    opened: boolean;
    setOpened?: (val: boolean) => void;
    children: JSX.Element;
}

export default function Modal({ opened, children, setOpened }: ModalProps) {
    return (
        <div className={opened ? "modal modal--opened" : "modal"}>
            <div className="modal__background" onClick={() => setOpened ? setOpened(false) : undefined}></div>
            <div className="modal__inner">
                { children }
            </div>
        </div>
    );
}