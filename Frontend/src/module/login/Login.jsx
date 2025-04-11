import { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { useLoginUserMutation } from '../appSlice';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../common/Notifications/constants';
import { Box, Button, Container, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginUser] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const res = await loginUser(formData).unwrap();
        handleUserLogin(res);
        notifySuccess(res?.message);
        navigate("/");
      } catch (error) {
        notifyError(error?.data?.message);
      }
    }
  };

  return (
    <Grid className="container">
      <Grid className="rightBox">
        <Container maxWidth="lg">
          <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <Grid item xs={12} md={6} width={"100%"}>
              <Box
                sx={{
                  p: 6,
                  pt: 1,
                  pb: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '500px'
                }}
              >
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                  Sign In
                </Typography>
                <Box component="form" onSubmit={handleLogin} margin={"30px"}>
                  <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 1 }}
                  />

                  <TextField
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 1 }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    Login
                  </Button>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 3 }}
                  >
                    Don't have an account?{' '}
                    <Typography
                      onClick={() => navigate("/register")}
                      component="span"
                      color="primary"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      Register
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}
export default Login;