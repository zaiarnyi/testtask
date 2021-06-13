import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";

interface IModalProp {
  hide: () => void;
}

export const Modal: React.FC<IModalProp> = ({ hide }) => {
  const text = useSelector(
    (state: AppStateType) => state.users.message.personMSG
  );
  return (
    <div className={"modal"}>
      <div className="modal__container">
        <div className="modal__content">
          <div className="modal__body">
            <div className="modal__info">
              <h2 className="modal__title subtitle">Congratulations</h2>
              <div className="modal__message">{text}</div>
            </div>
            <div className="modal__button">
              <button className={"btn"} onClick={hide}>
                Great
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
