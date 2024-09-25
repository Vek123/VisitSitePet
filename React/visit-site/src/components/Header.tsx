import React from "react";

import BurgerIcon from "./UI/BurgerIcon";
import { Dropdown } from "../types/Dropdown";


function toggleDropdown(event: React.MouseEvent, dropdown: Dropdown | null): void {
    const dropdownContainer = document.querySelector(".header__dropdown")
    if (dropdownContainer?.classList.contains("header__dropdown--active")) {
        dropdown?.closeDropdown();
    } else {
        dropdown?.openDropdown();
    }
    dropdownContainer?.classList.toggle("header__dropdown--active");
}

function closeDropdown(event: MouseEvent, dropdown: Dropdown | null): void {
    let dropdownContainer: HTMLDivElement | null = document.querySelector(".header__dropdown--active");
    if (dropdownContainer && !(event.target as HTMLDivElement).closest(".header")) {
        dropdownContainer.classList.remove("header__dropdown--active");
        document.querySelector(".header__burger .burger-icon")?.classList.remove("burger-icon--active");
        dropdown?.closeDropdown();
    }
}


type HeaderProps = {

};
type HeaderState = {
    dropdown: Dropdown | null;
};

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            dropdown: null,
        }
    }
    componentDidMount(): void {
        const dropdownEl = document.querySelector(".header__dropdown") as HTMLElement;
        this.setState(state => ({dropdown: new Dropdown(dropdownEl, null, null, 8)}));
        document.addEventListener("click", (event) => closeDropdown(event, this.state.dropdown));
    }
    render() {
        return (
            <header className="header">
            <div className="template-container">
                <div className="header__inner">
                    <nav className="header__nav">
                        <ul>
                            <li className="header__logo"><a href="/">Логотип</a></li>
                            <li><a href="/">Главная страница</a></li>
                            <li><a href="/ui">Ui страница</a></li>
                            <li className="header__burger" onClick={(e) => toggleDropdown(e, this.state.dropdown)}><BurgerIcon/></li>
                        </ul>
                    </nav>
                </div>
                <div className="header__dropdown">
                    <div className="header__dropdown-inner">
                        <ul>
                            <li><a href="/">Главная страница</a></li>
                            <li><a href="/ui">Ui страница</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        )
    };
}

export default Header;