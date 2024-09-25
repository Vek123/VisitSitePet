import React from "react";

function toggleBurger(event: React.MouseEvent<HTMLDivElement>) {
    event.currentTarget.classList.toggle("burger-icon--active");
}

function BurgerIcon() {
    return (
        <div className="burger-icon" onClick={toggleBurger}>
            <div className="burger-icon__line burger-icon__line--left"></div>
            <div className="burger-icon__line burger-icon__line--right"></div>
        </div>
    );
}

export default BurgerIcon