import React from "react";


type SelectItem = {
    data: string,
}

type SelectProps = {
    className: string,
    name: string,
    required: boolean,
    inputId: string,
    default?: SelectItem,
    items: SelectItem[],
}

function openList(event: React.MouseEvent<HTMLLabelElement>) {
    let select = event.currentTarget.closest(".select");
    if (select) {
        if (select.classList.contains("select--opened")) {
            select.classList.remove("select--opened");
            document.removeEventListener("click", closeList);
        } else {
            select.classList.add("select--opened");
            document.addEventListener("click", closeList);
            openedList = select as HTMLDivElement;
        }
    }
}
function closeList(this: Document, event: MouseEvent): any {
    if ((event.target as HTMLElement).closest(".select") !== openedList || (event.target as HTMLElement).classList.contains("select__item")) {
        openedList?.classList.remove("select--opened");
        openedList = null;
    }
}

function choiceItem(event: React.MouseEvent<HTMLDivElement>) {
    let input = event.currentTarget.closest(".select")?.querySelector(".select__input");
    let label = event.currentTarget.closest(".select")?.querySelector(".select__label");
    event.currentTarget.parentElement?.querySelectorAll(".select__item--selected").forEach(x => x.classList.remove("select__item--selected"));
    event.currentTarget.classList.add("select__item--selected");
    input?.setAttribute("value", event.currentTarget.innerText);
    if (label) {
        label.textContent = event.currentTarget.innerText;
        if (event.currentTarget.innerText === "----" && !label.classList.contains("select__label--default")) {
            label.classList.add("select__label--default");
        } else if (label.classList.contains("select__label--default")) {
            label.classList.remove("select__label--default");
        }
    }
    input?.dispatchEvent(new Event("change"));
}

let openedList: HTMLDivElement | null;

export default function Select(props: SelectProps, kwargs: any) {
    return (
        <div className={`select ${props.className}`.trim()}>
            <input id={props.inputId} type="radio" className="select__input" defaultValue={props.default ? props.default.data : "----"} data-default={props.default ? props.default.data : "----"} {...kwargs} defaultChecked/>
            <label className={props.default ? "select__label" : "select__label select__label--default"} htmlFor={props.inputId} onClick={openList}>{props.default ? props.default.data : "----"}</label>
            <div className="select__icon"></div>
            <div className="select__dropdown">
                <div className="select__dropdown-inner">
                    {!props.required && <div className={props.default ? "select__item" : "select__item select__item--selected"} onClick={choiceItem}>----</div>}
                    {props.items.map((item, index) => (
                        <div key={index} className={props.default && item.data === props.default.data ? "select__item select__item--selected" : "select__item"} onClick={choiceItem}>
                            {item.data}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}