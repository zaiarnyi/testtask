import React from "react";
import pussy from "../../assets/img/pussy.jpg";

interface IBannerProp {
  onScrollToReg: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Banner: React.FC<IBannerProp> = ({ onScrollToReg }) => {
  return (
    <section className={"banner"}>
      <div className="banner__container container">
        <div className={"banner__body"}>
          <div className="banner__info">
            <h1 className="banner__title title">
              Test assignment for front-end developers
            </h1>
            <p className={"banner__descry descry"}>
              Front-end developers make sure the user sees and interacts with
              all the necessary elements to ensure conversion. Therefore,
              responsive design, programming languages and specific frameworks
              are the must-have skillsets to look for when assessing your
              front-end developers.
            </p>
            <div className="banner__button">
              <button className={"btn"} onClick={onScrollToReg}>
                Show up
              </button>
            </div>
          </div>
        </div>
        <div className="banner__bg">
          <img src={pussy} alt="pussy" />
        </div>
      </div>
    </section>
  );
};
