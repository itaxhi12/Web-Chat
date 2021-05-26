/** @format */

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;
const initialState = {
  user: user,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.data,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
