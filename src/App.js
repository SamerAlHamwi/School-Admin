import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import ToastComponent from './helpers/toast'
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

import "./assets/scss/theme.scss"

import fakeBackend from "./helpers/AuthType/fakeBackend"
import { refreshMenuHeader } from 'store/actions'

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.                      ,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  useEffect(() => {
    ToastComponent.createContainer()
    props.getInfoMenuHeader()
  }, [])

  const Layout = getLayout()
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              // isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInfoMenuHeader : () => dispatch(refreshMenuHeader())
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
