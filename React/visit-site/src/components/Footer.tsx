import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="template-container">
                <div className="footer__inner">
                    <ul>
                        <li className="footer__logo">Логотип</li>
                        <li>
                            <ul className="footer__nav">
                                <li><a href="/">Главная страница</a></li>
                                <li><a href="/ui">Ui страница</a></li>
                            </ul>
                        </li>
                        <li>
                            <ul className="footer__contacts">
                                <li>г. Пермь</li>
                                <li><a href="mailto:pikylevkirill@inbox.ru">pikylevkirill@inbox.ru</a></li>
                                <li><a href="tel:+79127434625">+7 (912) 743-46-25</a></li>
                                <li><a href="https://github.com/Vek123" target="_blank" rel="noreferrer">GitHub</a></li>
                                <li><a href="https://odintsovo.hh.ru/resume/e205d4d4ff0ced81470039ed1f576151396752" target="_blank" rel="noreferrer">HeadHunter</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;