import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from '../images/foodtruck.png';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, TextField } from '@material-ui/core/';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    margin: '80px auto',
    border: '1px solid #d2d2d2',
    boxShadow: '0px 1px 10px -2px #807f7f',
    borderRadius: '15px',
    backgroundColor: '#FFF9F0',
    width: '70%',
    height: '62vh',
    '@media (max-width: 550px)': {
        width: '90%',
        height: 'auto',
        marginBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        },
    },
  header: {
    textAlign: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    '@media (max-width: 550px)': {
      marginBottom: '10%',
    },
  },
  responsive: {
    '@media (max-width: 550px)': {
      width: '100%',
      height: 'auto',
    },
  },
  error: {
    color: 'red',
  },
  button: {
    width: '30%',
    marginLeft: '35%',
    padding: '1% 0',
    backgroundImage: 'linear-gradient(#FFAD33, #BF8124)',
    color: 'white',
    '&:focus': {
      outline: 'none',
    },
  },
  footer: {
    marginBottom: '5%',
  },
}));

// Yup Validation
const validationSchema=Yup.object({
  username: Yup.string()
    .min(4, 'Must be 4 to 8 characters')
    .max(8, 'Must be 4 to 8 characters')
    .required('Required'),
  password: Yup.string()
    .required('No password provided')
    .min(6, 'Must be 6 to 12 characters')
    .max(12, 'Must be 6 to 12 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
      'Password needs at least one upper case letter, one lower case letter, and one numeric digit'
    ),
});

const Login = () => {
  // setting component styles
  const classes = useStyles();

  // setting formik initial values
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      axios
        .post('https://food-truck-trackr-api.herokuapp.com/api/auth/login', {
          username: values.username,
          password: values.password,
          headers: {
            authorization: 'Bearer <token>',
          },
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
  });
  
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.header}>
            <img alt={'foodtruck'} src={Image} className={classes.responsive} />
            <h5>Login</h5>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='username'
                name='username'
                label='Username'
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} className={classes.footer}>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                className={classes.button}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };
  
  export default Login;
