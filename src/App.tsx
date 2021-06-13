import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/blocks/Header";
import { Banner } from "./components/blocks/Banner";
import { Dev } from "./components/blocks/Dev";
import { Users } from "./components/blocks/Users";
import { Register } from "./components/blocks/Register";
import { Footer } from "./components/blocks/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "./components/Redux/Store";
import { thunkGetToken } from "./components/Redux/AppReducer";
import { thunkGetPosition } from "./components/Redux/PositionReducer";
import { Modal } from "./components/blocks/Modal";
import {
  thunkSetUser,
  thunkShowMore,
  URL_RESPONSE,
  userActions,
} from "./components/Redux/userReducer";

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const new_Link = useSelector(
    (state: AppStateType) => state.users.links.next_url
  );
  const isLoadPerson = useSelector(
    (state: AppStateType) => state.users.isLoadingPerson
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      thunkGetToken(
        " https://frontend-test-assignment-api.abz.agency/api/v1/token"
      )
    );
    dispatch(thunkSetUser(URL_RESPONSE));
    dispatch(
      thunkGetPosition(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
      )
    );
  }, []);
  useEffect(() => {
    const body = document.body as HTMLElement;
    if (isLoadPerson) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isLoadPerson]);

  //Function
  const onHideHandler = () => {
    dispatch(userActions.toggleStatus("person", false));
  };
  const onToggleHandler = useCallback(() => {
    setMobileMenu(!mobileMenu);
  }, [mobileMenu]);
  const onScrollToReg = useCallback(() => {
    const headerBlock = document.querySelector(".header") as HTMLElement,
      registerBlock = document.querySelector(".register") as HTMLElement,
      headerHeight = headerBlock.clientHeight,
      offsetTop = registerBlock.offsetTop + headerHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }, []);
  const onShowMore = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(thunkShowMore(new_Link!));
      const target = e.currentTarget as HTMLElement;
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [new_Link]
  );
  return (
    <>
      <Header mobileMenu={mobileMenu} onToggleHandler={onToggleHandler} />
      <main className={!mobileMenu ? "page" : "page hide-mobile"}>
        <Banner onScrollToReg={onScrollToReg} />
        <Dev onScrollToReg={onScrollToReg} />
        <Users onShowMore={onShowMore} />
        <Register />
      </main>
      {isLoadPerson && <Modal hide={onHideHandler} />}
      <Footer />
    </>
  );
}

export default App;
