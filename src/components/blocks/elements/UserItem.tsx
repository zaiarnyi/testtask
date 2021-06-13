import React from "react";
import noImage from "../../../assets/img/no-people.png";

interface IUserItemProp {
  name: string;
  email: string;
  phone: string;
  photo: string;
  position: string;
}

export const hideLongContacts = (value: string): string => {
  let string = "",
    count = 25;
  if (value.length > count) {
    string = value.substring(0, count) + "...";
  } else {
    string = value;
  }

  return string;
};

export const UserItem: React.FC<IUserItemProp> = ({
  name,
  email,
  phone,
  photo,
  position,
}) => {
  return (
    <div className="item-user">
      <div className="item-user__photo">
        <img src={photo || noImage} alt={name} />
      </div>
      <div className="item-user__name">
        {!name.includes(" ") && !name.includes("-") && name.length > 10
          ? hideLongContacts(name)
          : name}
      </div>
      <div className="item-user__profession">{position}</div>
      <div className="item-user__contacts">
        <a href={`mailto:${email.toLowerCase()}`} className={"item-user__link"}>
          {hideLongContacts(email)}
        </a>
      </div>
      <div className="item-user__contacts">
        <a href={`tel:+${parseInt(phone)}`} className={"item-user__link"}>
          {phone}
        </a>
      </div>
    </div>
  );
};
