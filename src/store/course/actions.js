import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA,
    GET_COURSE,
    CHANGE_STATUS_COURSE_FAIL,
    CHANGE_STATUS_COURSE_SUCCESS,
    CHANGE_STATUS_COURSE
} from "./actionTypes";

export const apiSuccess = (actionType, data) => ({
    type: API_SUCCESS,
    payload: {
        actionType,
        data
    },
});

export const apiFail = (actionType, error) => ({
    type: API_FAIL,
    payload: {
        actionType,
        error
    },
});

// charts data
export const getCourseAction = () => ({
    type: GET_COURSE,
    payload: {}
});

export const changeStatusCourseSuccess = (payload) => {
    console.log(payload)
    return({
        type: CHANGE_STATUS_COURSE_SUCCESS,
        payload
    })
};

export const changeStatusCourseFail = (status) => ({
    type: CHANGE_STATUS_COURSE_FAIL,
    payload: {
        status
    }
});

export const changeStatusCourseAction = ({
    id,
    status
}) => ({
    type: CHANGE_STATUS_COURSE,
    payload: {
        status,
        id
    }
});