const initialState = {
  data:[]
}

//Cart Item
// {productId,categoryId,quantity}

const reducer = function loginReducer (state = initialState, action) {
  switch (action.type) {
    case 'CART_ADD':
      var newData = JSON.parse(JSON.stringify(state.data))
      //Is Product Already In Cart
      var existingItem=false
      newData.map((item)=>{
        if(item.productId==action.productId){
          existingItem=true
          item.quantity+=action.quantity
        }
      })
      if(!existingItem){
        newData.push({productId:action.productId,categoryId:action.categoryId,quantity:action.quantity})
      }
      return {
        ...state,
        data:newData
      }

      case 'CART_REMOVE':
        var newData = state.data.filter((item)=>item.productId!=action.productId)
        return {
          ...state,
          data:newData
        }

      case 'CART_UPDATE':
        var newData = JSON.parse(JSON.stringify(state.data))
        newData.map((item)=>{
          if(item.productId==action.productId){
            Object.assign(item,action.newValue)
          }
        })
        return {
          ...state,
          data:newData
        }

    default:
      return state
  }
}

export default reducer
