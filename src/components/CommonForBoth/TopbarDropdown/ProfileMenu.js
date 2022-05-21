import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "assets/images/users/avatar-1.jpg"

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('tokenAuth')
    window.location.href = '/login'
  }

  // const [username, setusername] = useState("Admin")
  // const [isLogin, setIsLogin] = useState(false)

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.displayName)
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       const obj = JSON.parse(localStorage.getItem("authUser"))
  //       setusername(obj.username)
  //     }
  //   }
  // }, [props.success])

  // useEffect(() => {
  //   const token = localStorage.getItem("tokenAuth")
  //   if(!token) return setIsLogin(false)
  // }, [])

  return (
    <React.Fragment>
      {
        props.isLogin ? 
        <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{props.fullname}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1"/>
            {props.t("Profile")}{" "}
          </DropdownItem>
          <div className="dropdown-divider"/>
          <p onClick={handleLogout} className="dropdown-item" style={{cursor:"pointer"}}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </p>
        </DropdownMenu>
        </Dropdown>
        :
        <Link to="/login" className="dropdown-item" style={{ display: "flex", alignItems: 'center'}}>
            <span>{props.t("Login")}</span>
        </Link>
      }
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { fullname, avatar, isLogin  } = state.Profile
  return { fullname, avatar, isLogin  }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
