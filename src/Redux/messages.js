const initialState = {
    messages:[]
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET MESSAGES":
            return {
                ...state,
                messages:action.data
            }
        case "NEW MESSAGE":
            return {
                ...state,
                messages:[...state.messages,action.data]
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer