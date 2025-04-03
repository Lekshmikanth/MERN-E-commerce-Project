import { Grid, Hidden } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import waveWhite from "../../../../assets/images/hrmsImg/waveWhite.png";
import waveOrange from "../../../../assets/images/hrmsImg/waveOrange.png";
import welcomeImg from "../../../../assets/images/hrmsImg/welcomeImg.png";
import { makeStyles } from "@mui/styles";
import { Form, withFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Components, FormController, I18n } from "../../common/components";
import "./Reset.css";
import { postResetPassword } from "../actions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { passwordSchema } from "./validate";

const useStyle = makeStyles({
    heading: {
        fontWeight: "400"
    },
    btn: {
        width: "98%"
    },
    imgOrange: {
        width: "100%",
        overflow: "visible"
    },
    input: {
        height: "50px"
    }
});

const { Button } = Components;


const Reset = (props) => {
    const { handleSubmit } = props;
    const classes = useStyle();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    return (
        <>
            <Grid container >
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Grid container >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="welcomePoster">
                            <Grid container >
                                <Hidden smDown><Grid item xl={1} lg={1} md={1} sm={0} xs={0}></Grid></Hidden>
                                <Grid item xl={11} lg={11} md={11} sm={12} xs={12} className="blackGrid" sx={{ backgroundColor: "rgb(0, 0, 0)", width: "100%" }}>
                                    <Grid container>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                                            <img id="reset-WaveWhite" src={waveWhite} alt="waveWhite" width="100%" />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <img id="reset-Wave" src={welcomeImg} className={classes.img} alt="waveWhite" width="77%" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Grid container>
                        <Hidden mdDown>
                            <Grid item xl={12} lg={12} md={12} sm={0} xs={0} className="rightTop"></Grid>
                        </Hidden>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="rightForm">
                            <Grid container>
                                <Grid item xl={3} lg={3} md={2} sm={2} xs={1}></Grid>
                                <Grid item xl={6} lg={6} md={8} sm={8} xs={10} sx={{ textAlign: "center" }}>
                                    <h2 id="reset-password" className={classes.heading}>Reset Password</h2>
                                    <Form onSubmit={handleSubmit} id="reset-form">
                                        <FormController id="current-password" control="input" name="currentPassword" type={showPassword ? "text" : "password"} placeholder={I18n("current_password")} startAdornment={<LockOutlinedIcon position="start" sx={{ color: "#FF7400", height: "20px" }} />} icons={showPassword ? <Visibility /> : <VisibilityOff />} onClick={handleClickShowPassword} className={classes.input} />
                                        <FormController id="new-password" control="input" name="password" type={showPassword1 ? "text" : "password"} placeholder={I18n("new_password")} startAdornment={<LockOutlinedIcon position="start" sx={{ color: "#FF7400", height: "20px" }} />} icons={showPassword1 ? <Visibility /> : <VisibilityOff />} onClick={handleClickShowPassword1} className={classes.input} />
                                        <FormController id="confirm-password" control="input" name="retypePassword" type={showPassword2 ? "text" : "password"} placeholder={I18n("retype_password")} startAdornment={<LockOutlinedIcon position="start" sx={{ color: "#FF7400", height: "20px" }} />} icons={showPassword2 ? <Visibility /> : <VisibilityOff />} onClick={handleClickShowPassword2} className={classes.input} />
                                        <Button id="reset-submit" type="submit" className={classes.btn}>
                                            {I18n("submit")}
                                        </Button>
                                    </Form>
                                </Grid>
                                <Grid item xl={3} lg={3} md={2} sm={2} xs={1}></Grid>
                            </Grid>
                        </Grid>
                        <Hidden mdDown>
                            <Grid item xl={12} lg={12} md={12} sm={0} xs={0} className="rightBottom"
                                sx={{ overflow: "hidden" }}>
                                <img id="reset-wavwOrange" src={waveOrange} alt="waveOrange" className={classes.imgOrange} />
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
    submit: (data) => dispatch(postResetPassword(data))
});

const ResetForm = withFormik({
    enableReinitialize: true,
    validationSchema: passwordSchema,
    mapPropsToValues: () => ({ currentPassword: "", password: "", retypePassword: "" }),
    handleSubmit: (values, { props: { submit } }) => {
        submit(values);
    },
    displayName: "ResetForm"
})(Reset);

export default connect(mapStateToProps, mapDispatchToProps)(ResetForm);
