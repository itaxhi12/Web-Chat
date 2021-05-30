const initialState = {
  currentChat: null,
  creds: null,
  chats: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case "SETCREDS":
          return {
              ...state,
              creds:action.data
          }
      
      case "SETCURRENT":
      return {
        ...state,
        currentChat: action.data,
      };

    case "GETCHATS":
      return {
        ...state,
        chats: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
