const initialState = {
  requesting: false,
  successful: false,
  data:[]
}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PRODUCTS_REQ':
      return {
        ...state,
        requesting:true,
        successful:false
      }
    case 'UPDATE_PRODUCTS_SUC':
      return {
        ...state,
        requesting:false,
        successful:true,
        data:action.data
      }
    default:
      return state
  }
}

export default reducer
