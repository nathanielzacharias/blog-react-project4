// require("dotenv").config();

import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }
  
const theme = createTheme();

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = event => {
        const data = new FormData(event.currentTarget);
        setFormData({
            username: data.get('username'),
            password: data.get('password'),
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        console.log(formData)
        
        fetch(`${process.env.REACT_APP_BASE_BACKEND_URL}/api/v1/user/login`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                return response.json()
            })
            .then(jsonResponse => {
                if (jsonResponse.error) {
                    console.log('jsonResponse',jsonResponse)
                    toast.error(jsonResponse.error)
                    return
                }

                toast.success("Login Successful!")

                // store the token into localstorage / cookie
                localStorage.setItem('user_token', jsonResponse.token)
                console.log(jsonResponse.token)

                navigate('/')
            })
            .catch(err => {
                console.log(err.response)
                toast.error(err.message)
            })
    }

    return (
        <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '60vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        //   sx={{
        //     backgroundImage: 'url(https://images.adsttc.com/media/images/577f/e4e8/e58e/ce71/f100/0001/newsletter/green_heart_doug_and_wolf_V5.jpg?1467999440)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundColor: (t) =>
        //       t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //   }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}

export default Login