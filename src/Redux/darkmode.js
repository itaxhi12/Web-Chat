const bool = localStorage.getItem("darkmode")
const initialState = {
  darkmode:bool ==="true"?true:false ,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK":
      return {
        ...state,
        darkmode: true,
      };
    case "LIGHT":
      return {
        ...state,
        darkmode: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
