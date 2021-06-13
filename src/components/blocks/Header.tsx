import React, { useEffect, useState } from "react";
import logo from "../../assets/img/cat.svg";

interface IHeaderProp {
  mobileMenu: boolean;
  onToggleHandler: () => void;
}

export const Header: React.FC<IHeaderProp> = React.memo(
  ({ mobileMenu, onToggleHandler }) => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll", onScrollHeader);
      return () => {
        window.removeEventListener("scroll", onScrollHeader);
      };
    }, []);

    //Func
    const onScrollHeader = (e: any) => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    //Variables
    return (
      <header className={!mobileMenu ? "header" : "header hide-mobile"}>
        <div className="header__container container">
          <a href="/" className="header__logo">
            <img src={logo} alt="logo" />
            <span>testtask</span>
          </a>

          <div className="header__menu menu">
            <div
              className={
                !mobileMenu
                  ? "menu__icon icon-menu"
                  : "menu__icon icon-menu active"
              }
              role="button"
              aria-label="burger menu"
              tabIndex={0}
              onClick={onToggleHandler}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav className={!mobileMenu ? "menu__body" : "menu__body active"}>
              <ul className="menu__list">
                <li>
                  <a href="#" className="menu__link">
                    About me
                  </a>
                </li>
                <li>
                  <a href="#" className="menu__link">
                    Relationships
                  </a>
                </li>
                <li>
                  <a href="#" className="menu__link">
                    Requirements
                  </a>
                </li>
                <li>
                  <a href="#" className="menu__link">
                    Users
                  </a>
                </li>
                <li>
                  <a href="#" className="menu__link">
                    Sign Up
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
);
