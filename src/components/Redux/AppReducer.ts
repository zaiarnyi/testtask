import { InferActionType, ThunkActionType } from "./Store";

//Default State
const initialState = {
  token: "",
  success: false,
};
//Actions
const appActions = {
  getToken: (body: ITokenResponse) =>
    ({
      type: "TESTTASK/GET_TOKEN_API",
      payload: body,
    } as const),
};

//Type Initial State
type InitialStateType = typeof initialState;
//Type ActionsApp
type ActionsAppType = InferActionType<typeof appActions>;
//Type Response TokeApi
interface ITokenResponse {
  success: boolean;
  token: string;
}

export const appReducer = (
  state = initialState,
  actions: ActionsAppType
): InitialStateType => {
  switch (actions.type) {
    case "TESTTASK/GET_TOKEN_API":
      return { ...state, ...actions.payload };
    default:
      return state;
  }
};

export const thunkGetToken = (
  url: string
): ThunkActionType<ActionsAppType> => async (dispatch) => {
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      dispatch(appActions.getToken(res));
    })
    .catch((error) => {
      throw new Error(error);
    });
};
