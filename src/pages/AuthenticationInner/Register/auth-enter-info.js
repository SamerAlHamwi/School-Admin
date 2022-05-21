import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import PropTypes from 'prop-types'
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { connect } from "react-redux"
import toast from 'helpers/toast'

// import images
import logodark from "assets/images/logo-dark.png";
import logolight from "assets/images/logo-light.png";
import { withTranslation } from "react-i18next";
import { post } from "helpers/api_helper";
import { REGISTER } from "helpers/api_url";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert"

const AuthEnterInfo = (props) => {
    const [avatar, setAvatar] = useState()
    const [isRegisterDone, setIsRegisterDone] = useState(false)

    //form validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
        fullname: '',
        password: '',
        rePassword: '',
        },
        validationSchema: Yup.object({
            // fullname: Yup.string().required(props.t("Please Enter Your Fullname")),
            // password: Yup.string().required(props.t("Please Enter Your Password")),
            // rePassword:  Yup.string().required(props.t("Please Enter Your Re Password"))
            //     .test('passwords-match', props.t('Passwords must match'), function(value){
            //         return this.parent.password === value
            //     })
            
        }),
        onSubmit: async (data) => {
            if(!avatar) return toast.error("Vui long chon avatar")
            try {
                const dataRegiser = {
                    email : props.email,
                    fullname : data.fullname,
                    password : data.password,
                    avatar : avatar
                }
                const resData = await post(REGISTER, dataRegiser)
                if(resData.error) throw new Error(resData.message)
                localStorage.setItem("tokenAuth", resData.data)
                setIsRegisterDone(true)

              
            } catch (error) {
                console.log(error)
                if(error.message == "email_exist") return toast.error(props.t("EMAIL_EXIST"))
                return toast.error(props.t("SOME_THINGS_WENT_WRONG"))
            }
        }
    });


    const handleChooseAvatar = (evt) => {
        const [file] = evt.target.files
        if (file) {
        const reviewAvatar = document.querySelector('#reviewAvatar')
            if(reviewAvatar) {
                setAvatar(file)
                reviewAvatar.style.backgroundImage =`url(${URL.createObjectURL(file)})`
            }
        }
    }

    return (
        <React.Fragment>
            {
                isRegisterDone &&
                <SweetAlert
                    success
                    title={props.t("Notify")}
                  onConfirm={() => {
                  }}
                >
                    {props.t("Regiter success")}
                </SweetAlert>
            }
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
                            <div className="mb-3 d-flex flex-column align-items-center">
                                <Label className="form-label">{props.t("Avatar")}</Label>
                                <Label className="form-label mx-auto"
                                    id="reviewAvatar"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius:'50%',
                                        border: '2px dashed #50a5f1',
                                        display: 'block',
                                        cursor : 'pointer',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    >
                                    <input 
                                        type={'file'} 
                                        onChange={(e) => handleChooseAvatar(e)}
                                        hidden 
                                        accept="image/*"
                                        />
                                </Label>
                            </div>

                            <div className="mb-3">
                            <Label className="form-label">{ props.t("Fullname") }</Label>
                            <Input
                                id="email"
                                name="fullname"
                                className="form-control"
                                placeholder={props.t("Enter fullname")}
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.fullname || ""}
                                invalid={
                                validation.touched.fullname && validation.errors.fullname ? true : false
                                }
                            />
                            {validation.touched.fullname && validation.errors.fullname ? (
                                <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback>
                            ) : null}
                            </div>

                            <div className="mb-3">
                            <Label className="form-label">{props.t("Password")}</Label>
                            <Input
                                name="password"
                                type="password"
                                placeholder={props.t("Enter password")}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={
                                validation.touched.password && validation.errors.password ? true : false
                                }
                            />
                            {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                            </div>
                            <div className="mb-3">
                            <Label className="form-label">{props.t("Re Password")}</Label>
                            <Input
                                name="rePassword"
                                type="password"
                                placeholder={props.t("Re Password")}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.rePassword || ""}
                                invalid={
                                validation.touched.rePassword && validation.errors.rePassword ? true : false
                                }
                            />
                            {validation.touched.rePassword && validation.errors.rePassword ? (
                                <FormFeedback type="invalid">{validation.errors.rePassword}</FormFeedback>
                            ) : null}
                            </div>

                            <div className="mt-4">
                            <button
                                className="btn btn-primary btn-block w-100"
                                type="submit"
                            >
                                {
                                    props.t("Register")
                                }
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

AuthEnterInfo.propTypes = {
    t: PropTypes.any,
    email: PropTypes.any
}

const mapStateToProps = (state) => ({
    email :  state.Account.email,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    // handleOtpValid : () => dispatch(handleOtpValid())
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AuthEnterInfo))
