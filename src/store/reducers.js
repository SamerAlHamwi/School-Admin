import {
  combineReducers
} from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//chat
import chat from "./chat/reducer"

//contacts
import contacts from "./contacts/reducer"

//Dashboard 
import Dashboard from "./dashboard/reducer";
import Course from "./course/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  chat,
  contacts,
  Dashboard,
  Course
})

export default rootReducer