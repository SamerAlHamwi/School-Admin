import React from "react"
import {
  Redirect
} from "react-router-dom"
// // Pages Component
import Chat from "../pages/Chat/Chat"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Inner Authentication
import Logout from "../pages/Authentication/Logout"
import Login from "../pages/AuthenticationInner/Login"
import Register from "../pages/AuthenticationInner/Register"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification2 from "../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Blog from "../pages/Dashboard-Blog/index"

//Blog
import BlogList from "../pages/Blog/BlogList/index"
import BlogGrid from "../pages/Blog/BlogGrid/index"
import BlogDetails from "../pages/Blog/BlogDetails"

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid"
import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"
import CoursePage from "pages/Course"

const authProtectedRoutes = [
  // {
  //   path: "/dashboard",
  //   component: Dashboard
  // },
  // {
  //   path: "/blog",
  //   component: Blog
  // },
  {
    path: "/course",
    component: CoursePage
  },

  // {
  //   path: "/chat",
  //   component: Chat
  // },

  // {
  //   path: "/profile",
  //   component: UserProfile
  // },

  // {
  //   path: "/blog-list",
  //   component: BlogList
  // },
  // {
  //   path: "/blog-grid",
  //   component: BlogGrid
  // },
  // {
  //   path: "/blog-details",
  //   component: BlogDetails
  // },

  // {
  //   path: "/contacts-grid",
  //   component: ContactsGrid
  // },
  // {
  //   path: "/contacts-list",
  //   component: ContactsList
  // },
  // {
  //   path: "/contacts-profile",
  //   component: ContactsProfile
  // },

  {
    path: "/",
    exact: true,
    component: () => < Redirect to = "/course" />
  },
]

const publicRoutes = [{
    path: "/logout",
    component: Logout
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/forgot-password",
    component: Recoverpw2
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/auth-recoverpw",
    component: ForgetPwd2
  },
  {
    path: "/page-confirm-mail",
    component: ConfirmMail2
  },
  {
    path: "/auth-email-verification",
    component: EmailVerification2
  },
  {
    path: "/auth-two-step-verification",
    component: TwostepVerification2
  },

  {
    path: "/pages-maintenance",
    component: PagesMaintenance
  },
  {
    path: "/pages-comingsoon",
    component: PagesComingsoon
  },
  {
    path: "/pages-404",
    component: Pages404
  },
  {
    path: "/pages-500",
    component: Pages500
  },
]

export {
  authProtectedRoutes,
  publicRoutes
}