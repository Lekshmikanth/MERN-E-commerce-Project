// import { Box, Grid, IconButton, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import { Form, withFormik } from "formik";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import { useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import "./Login.css";
// import { createStructuredSelector } from "reselect";
// import Button from "../../common/custom/Button";
// import image from "../../assets/images.jpeg"
// import { loginSchema } from "./validate";
// import { FormController, I18n } from "../../common";

// const useStyles = makeStyles({
//   btn: {
//     width: "100%"
//   },
//   links: {
//     color: "#000",
//     textDecoration: "none",
//     float: "right",
//     marginTop: "10px",
//     cursor: "pointer"
//   },
//   img1: {
//     justifyContent: "center",
//     display: "flex",
//     alignItems: "center"
//   },
//   input: {
//     height: "50px"
//   },
//   waveWhite: {
//     width: "300%",
//     justifyContent: "center",
//     alignItems: "center",
//     display: "flex"
//   },
//   welcome: {
//     color: "white",
//     display: "flex",
//     justifyContent: "center",
//     marginRight: "150px",
//     marginTop: "80px"
//   },
//   img2: {
//     paddingBottom: "20px",
//     display: "flex",
//     justifyContent: "center"
//   }
// });

// function Login(props) {
//   const { handleSubmit } = props;
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);


//   return (
//     <>
//       <Grid container>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//           <Grid container>
//             <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ justifyContent: "center", display: "flex", alignItems: "center" }} className="mainGrid" >
//               <img src={image} width="600px" alt="" />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
//           <Grid container sx={{ height: "100vh" }}>
//             <Grid item xs={0} sm={0} md={12} lg={12} xl={12} ></Grid>
//             <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
//               <Grid container>
//                 <Grid item xs={1} sm={2} md={3} lg={3} xl={3}></Grid>
//                 <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
//                   <Form id="form-Login" onSubmit={handleSubmit} className="form">
//                     <Grid container>
//                       <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.img2}>
//                         <img id="login-image-TroisLogo" src={"troisLogo"} alt="trois" width="35%" />
//                       </Grid>
//                       <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                         <FormController id="login-Username" control="input" name="userName" placeholder={I18n("user_name")} startAdornment={<PermIdentityIcon id="user-Icon" position="start" sx={{ color: "#FF7400", width: "20px", height: "20px", marginRight: "5px", marginLeft: "5px" }} />} className={classes.input} />
//                       </Grid>
//                       <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
//                         <FormController id="login-Password" control="input" name="password" placeholder={I18n("password")} type={showPassword ? "text" : "password"} startAdornment={showPassword ? (<IconButton id="password-Icon" onClick={handleClickShowPassword}> <Visibility sx={{ color: "#FF7400", width: "15px", height: "15px" }} /></IconButton>) : (<IconButton id="button-password" onClick={handleClickShowPassword}> <VisibilityOff sx={{ color: "#FF7400", width: "15px", height: "15px" }} /> </IconButton>)} className={classes.input} />
//                       </Grid>
//                     </Grid>
//                     <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                       <Button id="button-Login" type="submit" className={classes.btn} >Login </Button>
//                     </Box>
//                   </Form>
//                   <Typography className={classes.links} onClick={() => navigate("/Reset")}>Forgot Password?</Typography>
//                 </Grid>
//                 <Grid item xs={0} sm={0} md={3} lg={3} xl={3}></Grid>
//               </Grid>
//             </Grid>

//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// const mapStateToProps = createStructuredSelector({
// });

// const mapDispatchToProps = (dispatch) => ({
//   submit: (data) => dispatch((data))
// });

// const loginForm = withFormik({
//   enableReinitialize: true,
//   validationSchema: loginSchema,
//   mapPropsToValues: () => ({ userName: "", password: "" }),
//   handleSubmit: (values, { props: { submit } }) => {
//     submit(values);
//   },

//   displayName: "loginForm"
// })(Login);

// export default connect(mapStateToProps, mapDispatchToProps)(loginForm);

import { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { useLoginUserMutation } from '../appSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginUser] = useLoginUserMutation();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await loginUser(form).unwrap();
      handleUserLogin(res);
      if (res.message === "Login successful") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;