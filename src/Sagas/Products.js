//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {updateProducts} from 'Api/Products'

function* updateProductsFlow(action){
  try {

    const response = yield call(updateProducts)
    if(response.count){
      yield put({type:'UPDATE_PRODUCTS_SUC',data:response.items})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_PRODUCTS_REQ', updateProductsFlow)
}

export default templateWatcher
