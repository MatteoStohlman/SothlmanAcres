//SYSTEMSET_OUTLET_REQ
  import React from 'react';
  import { call, put, takeLatest } from 'redux-saga/effects'

//APIs
  import {setOutlet} from './api'

function* setOutletFlow(action){
  try {
    const {roomNumber,unit,state} = action
    const response = yield call(setOutlet,roomNumber,unit,state)
    if(response.length){
      yield put({type:'SET_OUTLET_SUC',response})
    }

  } catch (error) {
    console.log(error)

  }
}

function* templateWatcher () {
  yield takeLatest('SET_OUTLET_REQ', setOutletFlow)
}

export default templateWatcher
