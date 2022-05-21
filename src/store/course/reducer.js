import {
	API_SUCCESS,
	CHANGE_STATUS_COURSE_SUCCESS
} from "./actionTypes";

const INIT_STATE = {
	courses: []
};

const CourseReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case API_SUCCESS:
			return {
				...state,
				courses: action.payload.data
			}
			case CHANGE_STATUS_COURSE_SUCCESS:
				const currentCourse = state.courses.findIndex(course => course._id === action.payload.id)
				const cloneCourses = [...state.courses]
				if (currentCourse !== -1) {
					cloneCourses[currentCourse].status = action.payload.status
				}

				return {
					...state,
					courses: cloneCourses
				}
				default:
					return state;
	}
}


export default CourseReducer;