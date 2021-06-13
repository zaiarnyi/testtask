import React from "react";
import logoFooter from "../../assets/img/LOGO.svg";

interface IFooterProp {}

export const Footer: React.FC<IFooterProp> = (props) => {
  return (
    <div className={"footer"}>
      <div className="footer__top">
        <div className="footer__text container">
          <span> © abz.agency specially for the test task</span>
        </div>
        <div className="footer__middleware"></div>
        <div className="footer__down container">
          <div className="footer__down-info">
            <a href="/" className="footer__logo">
              <img src={logoFooter} alt="" />
            </a>
            <span className="footer__descr">0201 - Homepage - 1024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
