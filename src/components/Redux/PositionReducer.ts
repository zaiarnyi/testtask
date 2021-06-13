import { InferActionType, ThunkActionType } from "./Store";

export interface IPositions {
  id: number;
  name: string;
} // Array Position
interface IResponsePosition {
  success: boolean;
  positions: Array<IPositions>;
}

//Default State
const initialState = {
  isLoadingPosition: false,
  positions: [] as [] | Array<IPositions>,
  message: null as null | string,
};
//Actions
const positionActions = {
  getPosition: (body: IResponsePosition) =>
    ({
      type: "TESTTASK/GET_POSITION_API",
      payload: body,
    } as const),
  setError: (msg: string) =>
    ({
      type: "TESTTASK/SET_ERROR_MESSAGE",
      payload: msg,
    } as const),
};

//Type Default State
type InitStateType = typeof initialState;
//Type Actions
type ActionsPositionType = InferActionType<typeof positionActions>;

export const positionsReducer = (
  state = initialState,
  actions: ActionsPositionType
): InitStateType => {
  switch (actions.type) {
    case "TESTTASK/GET_POSITION_API":
      const { success, positions } = actions.payload;
      return { ...state, ...{ positions, isLoadingPosition: success } };
    case "TESTTASK/SET_ERROR_MESSAGE":
      return { ...state, message: actions.payload };
    default:
      return state;
  }
};

export const thunkGetPosition = (url: string): ThunkActionType => async (
  dispatch
) => {
  await fetch(url)
    .then((res) => {
      if (res.status === 404) {
        return "Page not found";
      } else if (res.status === 422) {
        return "Positions not found";
      }
      return res.json();
    })
    .then((res) => {
      if (typeof res !== "string") {
        dispatch(positionActions.getPosition(res));
      } else {
        dispatch(positionActions.setError(res));
      }
    })
    .catch((error) => {
      dispatch(positionActions.setError("Пришла ошибка откуда ее не ждали"));
      throw new Error(error);
    });
};
