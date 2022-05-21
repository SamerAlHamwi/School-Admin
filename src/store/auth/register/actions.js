import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  SEND_OTP_SUCESS,
  OPT_VALID,
} from "./actionTypes"

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}

// MY HANDLE
export const handleSendOTPSuccess = email => {
  return {
    type: SEND_OTP_SUCESS,
    payload: { email },
  }
}

export const handleOtpValid = () => {
  return {
    type: OPT_VALID,
  }
}