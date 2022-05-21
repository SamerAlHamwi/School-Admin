import React from "react";
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import { Link, withRouter } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback } from "reactstrap";
import { connect } from "react-redux"
import toast from 'helpers/toast'
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";
import { withTranslation } from "react-i18next";
import { useEffect } from "react";
import { get } from "helpers/api_helper";
import { refreshMenuHeader } from "store/auth/profile/actions";
import { LOGIN } from "helpers/api_url";
import { post } from "helpers/api_helper";

const Login = (props) => {
  // Form validation 
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(props.t("Please Enter Your Email")),
      password: Yup.string().required(props.t("Please Enter Your Password")),
    }),
    onSubmit: async (values) => {
        try {
          const dataLogin = {
            username : values.email,
            password : values.password,
        }
        console.log("dataLogin",dataLogin)
        const resData = await post(LOGIN, dataLogin)
        console.log(`LHA:  ===> file: Login.js ===> line 42 ===> resData`, resData)
        if(resData.error) throw new Error(resData.message)
        localStorage.setItem("tokenAuth", resData.data.token)
        props.getInfoMenuHeader()
        props.history.push('/')
      } catch (error) {
        console.log(error)
        if(error.message == "email_not_exist") return toast.error(props.t("email_not_exist"))
        if(error.message == "wrong_password") return toast.error(props.t("wrong_password"))
        return toast.error(props.t("SOME_THINGS_WENT_WRONG"))
      }
    }
  });

  // useEffect(() => {
  //   get('api/v1/users/refresh-token').then(response => {
  //     console.log('response== ', response)
  //   }).catch(err => {
  //     console.log('err== ', err)
  //   })
  // }, [])

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{props.t("Login")}</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">{props.t("Login")}</h5>
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              name="email"
                              className="form-control"
                              placeholder={props.t("Enter email")}
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">{props.t("Password")}</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder={props.t("Enter password")}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                            >
                              {props.t("Log In")}
                            </button>
                          </div>

                        </Form>

                        {/* <Form action="dashboard">
                          <div className="mt-4 text-center">
                            <h5 className="font-size-14 mb-3">
                              Sign in with
                            </h5>

                            <ul className="list-inline">
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                >
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-info text-white border-info"
                                >
                                  <i className="mdi mdi-twitter"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                >
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </Form> */}
                        <div className="mt-5 text-center">
                          <p>
                            {props.t("Don&apos;t have an account")}{" "}?     {" "}
                              <a href="/register"
                                   className="fw-medium text-primary"
                              >
                                {props.t("Signup now")}
                              </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        ©{" "}
                        { new Date().getFullYear()}
                        {" "}
                        Hi-School
                        {" "}
                        <i className="mdi mdi-heart text-danger"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  t: PropTypes.any,
  history : PropTypes.any,
  getInfoMenuHeader : PropTypes.any,
}

const mapDispatchToProps = (dispatch) => ({
  getInfoMenuHeader : () => dispatch(refreshMenuHeader())
})

export default connect(null, mapDispatchToProps)(withTranslation()(withRouter(Login)))
