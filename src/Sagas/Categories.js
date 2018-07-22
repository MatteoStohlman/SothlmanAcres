//SYSTEM
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {getCategories} from 'Api/Categories'

function* updateCategoriesFlow(action){
  try {

    const response = yield call(getCategories)
    if(response.count){
      yield put({type:'UPDATE_CATEGORIES_SUC',data:response.items})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('UPDATE_CATEGORIES_REQ', updateCategoriesFlow)
}

export default templateWatcher
