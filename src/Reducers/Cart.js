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
        newData.push({productId:action.productId,actionId:action.categoryId,quantity:action.quantity})  
      }
      return {
        ...state,
        data:newData
      }
    default:
      return state
  }
}

export default reducer
