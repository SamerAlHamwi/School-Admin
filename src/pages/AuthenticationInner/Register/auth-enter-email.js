import React from "react";
import { Link } from "react-router-dom";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import logodark from "assets/images/logo-dark.png";
import logolight from "assets/images/logo-light.png";
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types'
import { SEND_OTP } from "helpers/api_url";
import { post } from "helpers/api_helper";
import toast from "helpers/toast";
import MESSAGE_NOTI from 'constants/messageNoti'
import { connect } from "react-redux"
import { handleSendOTPSuccess } from "store/actions";

const AuthEnterEmail = (props) => {
  //form validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required(props.t("Please Enter Your Email")).email(props.t("Wrong email format")),
    }),
    onSubmit: async (data) => {
        try {
            let resData = await post(SEND_OTP, data)
            if(resData.error) throw new Error(resData.message)
            props.handleSendOptSuccess(data.email)
            return toast.success(props.t("SENT OTP"))
        } catch (error) {
            if(error.message == "email_exist") return toast.error(props.t(MESSAGE_NOTI.EMAIL_EXIST))
            return toast.error(props.t(MESSAGE_NOTI.SOME_THINGS_WENT_WRONG))
        }
    }
  });
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
                    <div>
                    <h5 className="text-primary">{ props.t("Register account") }</h5>
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
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder={props.t("Enter email")}
                            type="text"
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

                        <div className="mt-4">
                        <button
                            className="btn btn-primary btn-block w-100"
                            type="submit"
                        >
                            {props.t("Send OTP")}
                        </button>
                        </div>

                    </Form>

                    <div className="mt-5 text-center">
                        <p>
                        {props.t("Already have an account")}{" "} ?{" "}
                        <Link
                            to="login"
                            className="font-weight-medium text-primary"
                        >
                            {" "}
                            {props.t("Login")}
                        </Link>{" "}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  );
};

AuthEnterEmail.propTypes = {
    t: PropTypes.any,
    handleSendOptSuccess : PropTypes.any
}

const mapDispatchToProps = (dispatch) => ({
    handleSendOptSuccess : (email) => dispatch(handleSendOTPSuccess(email))
})

export default connect(null, mapDispatchToProps)(withTranslation()(AuthEnterEmail) );
