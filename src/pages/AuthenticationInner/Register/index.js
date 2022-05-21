import React from "react";
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Col, Container, Form, FormFeedback, Input, Label, Row } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "assets/images/logo-dark.png";
import logolight from "assets/images/logo-light.png";
import CarouselPage from "../CarouselPage";

import TwostepVerification from './auth-two-step-verification'
import AuthEnterEmail from './auth-enter-email'
import AuthEnterInfo from './auth-enter-info'
import { withTranslation } from "react-i18next";

const Register = (props) => {
  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });


  const buildStepRegister = () => {
    switch (props.stepCurr) {
      case 0:
        return <AuthEnterEmail/>
      case 1:
        return <TwostepVerification/>
      case 2:
        return <AuthEnterInfo/>
    
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>{ props.t("Register account") }</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
          
              <div className="auth-full-page-content">
                <div className="w-100">
                  <div className="d-flex flex-column h-100 justify-content-between">

                  { buildStepRegister() }
                  
                    <div className="mt-4 mt-md-5 text-center pb-4">
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

Register.propTypes = {
  t: PropTypes.any,
  stepCurr: PropTypes.any
}

const mapStateToProps = (state) => ({
  stepCurr : state.Account.stepCurr
})

export default connect(mapStateToProps, null)(withTranslation()(Register))
