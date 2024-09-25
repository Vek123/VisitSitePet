import React from 'react';

import BurgerIcon from '../UI/BurgerIcon';
import IntextImage from '../UI/IntextImage';
import PageName from '../UI/PageName';
import TextInput from '../UI/TextInput';
import TextArea from '../UI/TextArea';
import Select from '../UI/Select';
import Checkbox from '../UI/Checkbox';

interface UiProps {
    pageName: string,
}

function Ui(props: UiProps) {
    return (
        <>
            <PageName name={props.pageName}/>
            <section className='ui'>
                <div className='template-container'>
                    <h1>Это Ui Страница</h1>
                    <BurgerIcon/>
                    <br />
                    <IntextImage image="/images/myPhoto.png" flex={true} text={<p>Это мой текст рядом с моей фотографией. Это мой текст рядом с моей фотографией. Это мой текст рядом с моей фотографией.</p>}/>
                    <br />
                    <TextInput className="" placeHolder="Введите имя" name='name' errorMessage="Это поле обязательно для заполнения и должно содержать минимум 2 символа."/>
                    <TextArea className="" placeHolder="Введите сообщение" name='message' errorMessage="Это поле обязательно для заполнения и должно содержать минимум 5 символов."/>
                    <Select className="" name="resume" required={false} inputId='select' items={[{data: "Fullstack Developer"}, {data: "Backend Developer"}, {data: "Frontend Developer"}]}/>
                    <Checkbox className='' name='checkbox' checked={true} text='Текст к кнопке типа Checkbox' inputId='checkbox'/>
                </div>
            </section>
        </>
    );
}

export default Ui;