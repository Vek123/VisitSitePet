import React, { useState } from "react";

import PageName from '../UI/PageName';
import FeedbackForm from "../UI/FeedbackForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";


interface ApiComProps {
    pageName: string,
}


export default function ApiCom(props: ApiComProps) {
    const [formOpened, setFormOpened] = useState(false);
    return(
        <>
            <PageName name={props.pageName}/>
            <div className="api-com">
                <Modal opened={formOpened} setOpened={setFormOpened}>
                    <FeedbackForm formTitle="Обратная связь"/>
                </Modal>
                <div className="template-container">
                    <Button className="api-com__feedback-form-button" text="Форма обратной связи" handleClick={() => setFormOpened(!formOpened)}/>
                </div>
            </div>
        </>
    )
}