import React from "react";
import devIMG from "../../assets/img/work.svg";

interface IDevProp {
  onScrollToReg: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Dev: React.FC<IDevProp> = ({ onScrollToReg }) => {
  return (
    <section className={"dev"}>
      <div className="dev__container container">
        <div className="dev__body">
          <div className="dev__item">
            <img src={devIMG} alt="" />
          </div>
          <div className="dev__item">
            <div className="dev__info">
              <h1 className="dev__title title">Let's get acquainted</h1>
              <h2 className="dev__subtitle subtitle">
                I'm a good front-end developer
              </h2>
            </div>
            <p className="dev__descry descry">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <div className="dev__button">
              <button className={"btn"} onClick={onScrollToReg}>
                Show up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
