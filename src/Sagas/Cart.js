//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {placeOrder} from 'Api/Cart'

function* placeOrderFlow(action){
  try {

    const response = yield call(placeOrder,action)
    if(response.success){
      yield put({type:'CART_PLACE_ORDER_SUCC',orderId:response.orderNumber})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('CART_PLACE_ORDER_REQ', placeOrderFlow)
}

export default templateWatcher
