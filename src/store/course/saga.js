import {
    getCourseService,
    changeStatusCourseService
} from "helpers/fakebackend_helper";
import {
    all,
    call,
    fork,
    put,
    takeEvery,
    takeLatest
} from "redux-saga/effects";
import {
    apiFail,
    apiSuccess,
    changeStatusCourseFail,
    changeStatusCourseSuccess
} from "./actions";
// Crypto Redux States
import {
    CHANGE_STATUS_COURSE,
    GET_COURSE
} from "./actionTypes";



function* getCourseYield() {
    try {
        const response = yield call(getCourseService, {});

        yield put(apiSuccess(GET_COURSE, response?.data || []));
    } catch (error) {
        yield put(apiFail(GET_COURSE, error));
    }
}

function* changeStatusCourseYield(action) {
    try {
        console.log("id,status2", action.payload)
        const response = yield call(changeStatusCourseService, action.payload);
        if(!response.success) throw new Error("change status course")

        yield put(changeStatusCourseSuccess({...action.payload}));
    } catch (error) {
        yield put(changeStatusCourseFail(CHANGE_STATUS_COURSE, error));
    }
}

export function* watchGetCourse() {
    yield takeEvery(GET_COURSE, getCourseYield);
}

export function* watchChangeStatusCourse() {
    console.log("run run")
    yield takeLatest(CHANGE_STATUS_COURSE, changeStatusCourseYield);

}

function* courseSaga() {
    yield all([fork(watchGetCourse), fork(watchChangeStatusCourse)]);
}

export default courseSaga;