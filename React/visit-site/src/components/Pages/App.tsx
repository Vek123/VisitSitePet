import React from 'react';

import IntextImage from '../UI/IntextImage';
import PageName from '../UI/PageName';


interface AppProps {
  pageName: string,
}

function App(props: AppProps) {
  return (
    <>
      <PageName name={props.pageName}/>
      <section className="about-me">
        <div className="template-container">
          <IntextImage image="/images/myPhoto.png" flex={true} text={
            <>
              <p>
                Привет, меня зовут <strong>Кирилл</strong>, я написал этот сайт,
                чтобы люди, которые зайдут на него, могли посмотреть, но мою реализацию небольшого сайта.
              </p>
              <p>
                Я студент 4 курса ПТПИТ, учусь по направлению "Обеспечение информационной безопасности автоматизированных систем".
                Для себя решил, что хочу развиваться в направлении программирования и разработки сайтов.
              </p>
            </>
            }/>
        </div>
      </section>
      <section className="about-site">
        <div className="template-container">
          <ol>
            <h3>Тут реализованы:</h3>
            <li>CRUD операции с API</li>
            <li>Валидация формы</li>
            <li>Аутентификация и авторизация пользователей с помощью JWT токенов</li>
            <li>UI компоненты</li>
            <li>Адаптивность под различные устройства</li>
          </ol>
          <ol>
            <h3>Использованы технологии:</h3>
            <li>Backend (RESTful): Django (DRF), JWT-Token, Redis</li>
            <li>Frontend: React (TypeScript), Redux, SCSS</li>
            <li>Database: Postgres</li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default App;
