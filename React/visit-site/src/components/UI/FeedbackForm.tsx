import React from "react";

import Checkbox from "./Checkbox";
import Select from "./Select";
import TextArea from "./TextArea";
import TextInput from "./TextInput";


interface FeedbackFormProps {
    formTitle: string,
}

export default function FeedbackForm(props: FeedbackFormProps) {
    return (
        <>
            <form className="form feedback-form">
                <h1 className="form__title">{props.formTitle}</h1>
                <div className="form__item">
                    <TextInput className="" name="name" placeHolder="Введите имя" errorMessage="Это обязательное поле, оно должно содержать минимум 2 символа"/>
                </div>
                <div className="form__item">
                    <TextInput className="" name="email" placeHolder="Введите почту" errorMessage="Это обязательное поле, оно должно содержать действительный адрес электронной почты"/>
                </div>
                <div className="form__item">
                    <TextArea className="" name="message" placeHolder="Введите сообщение" errorMessage="Это обязательное поле, оно должно содержать минимум 5 символов"/>
                </div>
                <div className="form__item">
                    <div className="form__title">Выберите тип сообщения</div>
                    <Select className="" name="report_type" required inputId="report_type" items={[{data: "Деловое"}, {data: "Простое"}, {data: "Отзыв"}]}/>
                </div>
                <div className="form__item">
                    <Checkbox className="" name="aggreement" inputId="aggreement" text="Нажимая на эту кнопку, вы соглашаетесь с обработкой <strong>персональных данных</strong>"/>
                </div>
            </form>
        </>
    )
}