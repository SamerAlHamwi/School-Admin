import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  SEND_OTP_SUCESS,
  OPT_VALID,
} from "./actionTypes"

const initialState = {
  stepCurr : 0,
  email : "",

  registrationError: null,
  message: null,
  loading: false,
  user: null,
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      }
      break
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }
      break

    //  MY HANDLE
    case SEND_OTP_SUCESS:
      state = {
        ...state,
        email : action.payload.email,
        stepCurr : 1
      }
      break

    case OPT_VALID:
      state = {
        ...state,
        stepCurr : 2
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account
