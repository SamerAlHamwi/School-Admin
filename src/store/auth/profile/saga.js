import { takeEvery, fork, put, all, call } from "redux-saga/effects"
import { SAGA_REFRESH_HEADER } from "./actionTypes";
import { get } from 'helpers/api_helper'
import { getDataRefreshHeader } from './actions'
import { REFRESH_TOKEN_LITE } from "helpers/api_url";

function* onRefreshMenuHeader() {
    try {
        const response = yield get(REFRESH_TOKEN_LITE)
        console.log(`LHA:  ===> file: saga.js ===> line 10 ===> response`, response)
        if(!response) throw new Error(response)
        return yield put(getDataRefreshHeader(response))
    } catch (error) {
        console.log("error",error)
        return yield put(getDataRefreshHeader({ error : true }))
    }
}

function* ProfileSaga() {
    yield takeEvery(SAGA_REFRESH_HEADER, onRefreshMenuHeader);
}

export default ProfileSaga
