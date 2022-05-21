import React, { useState }  from "react"
//Verification code package
import AuthCode from "react-auth-code-input"
// import images
import logodark from "assets/images/logo-dark.png"
import logolight from "assets/images/logo-light.png"
import { Col, Form, FormGroup, Row } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import toast from 'helpers/toast'
import { post } from "helpers/api_helper";
import { VERIFY_OTP } from "helpers/api_url"
import { handleOtpValid } from "store/actions"

const TwostepVerification = (props) => {

  const [txtCode, seteTxtCode] = useState();
  const handleOnChangeCode = (res) => {
    seteTxtCode(res);
  };

  const handleSubmitOtp = async () => {
    
    if(!txtCode || txtCode.length < 6) return toast.error(props.t("WRONG FORMAT OTP"))
    try {
      const dataVerify = {
        email : props.email,
        opt : txtCode
      }
      const resData = await post(VERIFY_OTP, dataVerify)
      if(resData.error) throw new Error(resData.message)
      return props.handleOtpValid()
    } catch (error) {
      if(error.message == "otp_wrong") return toast.error(props.t("WRONG OTP"))
      return toast.error(props.t("SOME_THINGS_WENT_WRONG"))
    }
  }

  return (
    <React.Fragment>
        <div className="w-100 p-md-5 p-4">
            <div className="w-100">
              <div className="d-flex flex-column h-100">
                <div className="mb-4 mb-md-5">
                  <Link to="dashboard" className="d-block auth-logo">
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
                  <div className="text-center">
                    <div className="avatar-md mx-auto">
                      <div className="avatar-title rounded-circle bg-light">
                        <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                      </div>
                    </div>
                    <div className="p-2 mt-4">
                      <h4>{props.t("Verify your email")}</h4>
                      <p>
                        {props.t("Please enter the 6 digit code sent to")}{" "}
                        <span className="font-weight-semibold">
                          { props.email }
                          </span>
                      </p>

                      <Form>
                        <Row>
                          <Col xs={12}>
                            <FormGroup className="verification-2 mb-3">
                              <AuthCode
                              allowedCharacters={'^[0-9]*$'}
                                characters={6}
                                onChange={handleOnChangeCode}
                                className="form-control form-control-lg text-center w-100"
                                inputStyle={{
                                  // width: "50px",
                                  // height: "calc(1.5em + 1rem + 2px)",
                                  width: "40px",
                                  height: "40px",
                                  padding: "5px",
                                  borderRadius: "8px",
                                  fontSize: "1.01562rem",
                                  textAlign: "center",
                                  margin: "0 2.5px",
                                  border: "1px solid #ced4da",
                                  textTransform: "uppercase",
                                  borderRadius: ".4rem"
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>

                      <div className="mt-4">
                        <span
                          className="btn btn-success w-md"
                          onClick={() => handleSubmitOtp()}
                        >
                          {props.t("Confirm")}
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </React.Fragment>
  )
}

TwostepVerification.propTypes = {
  t: PropTypes.any,
  email: PropTypes.any,
  handleOtpValid : PropTypes.any,
}

const mapStateToProps = (state) => ({
  email :  state.Account.email,
})

const mapDispatchToProps = (dispatch) => ({
  handleOtpValid : () => dispatch(handleOtpValid())
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TwostepVerification))
