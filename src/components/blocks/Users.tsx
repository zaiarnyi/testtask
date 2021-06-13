import React from "react";
import { UserItem } from "./elements/UserItem";
import { useSelector } from "react-redux";
import { AppStateType } from "../Redux/Store";
import { Loading } from "./elements/Loading";

interface IUsersProp {
  onShowMore: () => void;
}

export const Users: React.FC<IUsersProp> = React.memo(({ onShowMore }) => {
  const usersState = useSelector((state: AppStateType) => state.users);
  return (
    <section className={"users"}>
      <div className="users__container container">
        <div className="users__top">
          <h1 className="users__title title">Our cheerful users</h1>
          <h2 className={"user__subtitle subtitle"}>
            The best specialists are shown below
          </h2>
        </div>
        {usersState.isLoadingUsers ? (
          <div className={"user__content"}>
            <div className="users__body">
              {usersState.users
                .sort(
                  (a, b) => b.registration_timestamp - a.registration_timestamp
                )
                .map((item) => {
                  return (
                    <div
                      className="users__item"
                      key={`${item.id}_${item.name}`}
                    >
                      <UserItem
                        name={item.name}
                        email={item.email}
                        photo={item.photo}
                        phone={item.phone}
                        position={item.position}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="users__button">
              {usersState.isLoadingMoreUsers ? (
                <button
                  className={!!usersState.links.next_url ? "btn" : "btn hide"}
                  onClick={onShowMore}
                >
                  Show more
                </button>
              ) : (
                <>
                  <Loading />
                  <div>{usersState.message.usersMSG}</div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <Loading />
            <div>{usersState.message.usersMSG}</div>
          </>
        )}
      </div>
    </section>
  );
});
