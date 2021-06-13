import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { usersReducers } from "./userReducer";
import { appReducer } from "./AppReducer";
import { positionsReducer } from "./PositionReducer";

const rootReducers = combineReducers({
  app: appReducer,
  users: usersReducers,
  position: positionsReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Store
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

//Type State
export type AppStateType = ReturnType<typeof rootReducers>;
//Action Object Type
export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
//Type for Thunk Actions
export type ThunkActionType<AT extends Action = Action, R = void> = ThunkAction<
  R,
  AppStateType,
  unknown,
  AT
>;
