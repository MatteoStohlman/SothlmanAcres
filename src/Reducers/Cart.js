const initialState = {
  data:[],
  orderComplete:false,
  orderFailed:false,
  requesting:false,
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
      case 'CART_PLACE_ORDER_SUCC':
        var newData=[]
        return {
          ...state,
          data:newData,
          orderComplete:action.orderId,
          requesting:false,
        }
      case 'CART_PLACE_ORDER_REQ':
        var newData=[]
        return {
          ...state,
          requesting:true
        }
      case 'RESET_CART':
        return {
          initialState
        }
    default:
      return state
  }
}

export default reducer
