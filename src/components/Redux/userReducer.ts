import { InferActionType, ThunkActionType } from "./Store";

export interface IUsers {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}
interface IResponseGetUsers {
  count: number;
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: Array<IUsers>;
  links: { next_url: string | null; prev_url: string | null };
}
interface IFails {
  count: string[];
  page: string[];
}
interface IErrorResponse {
  success: boolean;
  message: string;
  fails?: any;
}
interface IRegisterNewPerson {
  success: boolean;
  user_id: number;
  message: string;
}
export const URL_RESPONSE =
  "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6";

//Default State
const initialState = {
  users: [] as [] | Array<IUsers>,
  success: false,
  links: {
    next_url: null as null | string,
    prev_url: null as null | string,
  },
  isLoadingUsers: false, //При загрузки Юзеров
  isLoadingPerson: false, // При регистрации
  isLoadingMoreUsers: true, // Подрузка новых Юзеров
  message: null as null | string,
  // message: {
  //   personMSG: null as null | string,
  //   usersMSG: null as null | string,
  // },
  fails: null as null | IFails,
};
//Actions
export const userActions = {
  setUserApi: (body: IResponseGetUsers) =>
    ({
      type: "TASKTEST/SET_USERS_API",
      payload: body,
    } as const),
  showMoreStaff: (body: IResponseGetUsers) =>
    ({ type: "TESTTASK/GET_MORE_STAFF", payload: body } as const),
  toggleStatus: (name: "users" | "person", value: boolean) =>
    ({
      type: "TASTTEST/TOGGLE_STATUS",
      payload: { name, value },
    } as const),
  messageResponse: (
    name: "users" | "person" | "showMore",
    body: IErrorResponse
  ) =>
    ({
      type: "TASKTEST/ERROR_RESPONSE",
      payload: { name, body },
    } as const),
};

//Type DefaultState
type InitStateType = typeof initialState;
//Type userActions
type actionsType = InferActionType<typeof userActions>;

//Reducer
export const usersReducers = (
  state = initialState,
  actions: actionsType
): InitStateType => {
  switch (actions.type) {
    case "TASKTEST/SET_USERS_API":
      const { users, links, success } = actions.payload;
      return {
        ...state,
        users: [...users],
        links,
        isLoadingUsers: success,
      };
    case "TESTTASK/GET_MORE_STAFF":
      return {
        ...state,
        users: [...state.users, ...actions.payload.users],
        links: { ...actions.payload.links },
      };
    case "TASTTEST/TOGGLE_STATUS":
      if (actions.payload.name === "users") {
        return { ...state, isLoadingMoreUsers: actions.payload.value };
      } else if (actions.payload.name === "person") {
        return { ...state, isLoadingPerson: actions.payload.value };
      }
      return state;
    case "TASKTEST/ERROR_RESPONSE":
      if (actions.payload.name === "users") {
        return {
          ...state,
          success: actions.payload.body.success,
          message: actions.payload.body.message,
          isLoadingUsers: actions.payload.body.success,
        };
      } else if (actions.payload.name === "person") {
        return {
          ...state,
          success: actions.payload.body.success,
          message: actions.payload.body.message,
          isLoadingPerson: actions.payload.body.success,
        };
      } else if (actions.payload.name === "showMore") {
        return {
          ...state,
          success: actions.payload.body.success,
          message: actions.payload.body.message,
          isLoadingMoreUsers: actions.payload.body.success,
        };
      }
      return state;
    default:
      return state;
  }
};

//Thunks
export const thunkSetUser = (
  url: string
): ThunkActionType<actionsType> => async (dispatch) => {
  await fetch(url)
    .then((res) => {
      if (res.status === 404) {
        return "Page not found";
      } else if (res.status === 422) {
        return "Validation failed";
      }
      return res.json();
    })
    .then((res) => {
      if (res.success) {
        dispatch(userActions.setUserApi(res as IResponseGetUsers));
      } else {
        dispatch(userActions.messageResponse("users", objError(...res)));
      }
    })
    .catch((error) => {
      dispatch(userActions.messageResponse("users", objError()));
      throw new Error(error);
    });
};
export const thunkShowMore = (
  url: string
): ThunkActionType<actionsType> => async (dispatch) => {
  dispatch(userActions.toggleStatus("users", false));
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch(userActions.showMoreStaff(res as IResponseGetUsers));
        dispatch(userActions.toggleStatus("users", true));
      } else {
        dispatch(userActions.messageResponse("showMore", objError(...res)));
      }
    })
    .catch((error) => {
      dispatch(userActions.messageResponse("showMore", objError()));
      throw new Error(error);
    });
};
export const thunkSetRegisterPerson = (
  url: string,
  formData: any,
  token: string
): ThunkActionType<actionsType> => async (dispatch) => {
  dispatch(userActions.toggleStatus("person", false));
  await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Token: token,
    },
  })
    .then((res) => res.json())
    .then((res: IRegisterNewPerson | IErrorResponse) => {
      if (res.success) {
        dispatch(thunkSetUser(URL_RESPONSE));
        dispatch(
          userActions.messageResponse(
            "person",
            objError(res.success, res.message)
          )
        );
      } else {
        dispatch(userActions.messageResponse("person", res));
      }
      dispatch(userActions.toggleStatus("person", true));
    })
    .catch((error) => {
      dispatch(userActions.messageResponse("person", objError()));
      dispatch(userActions.toggleStatus("person", true));
      throw new Error(error);
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(userActions.toggleStatus("person", false));
      }, 5000);
    });
};

function objError(success: boolean = false, msg: string = "Ловим ошибку") {
  return {
    success: success,
    message: msg,
  };
}
