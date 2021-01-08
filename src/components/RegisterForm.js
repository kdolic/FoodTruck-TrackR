import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import Image from '../images/foodtruck.png';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Button,
  Select,
  Checkbox,
  TextField,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@material-ui/core/';
import axios from 'axios';

// Styles for the form components
const useStyles = makeStyles(theme => ({
  container: {
    margin: '80px auto',
    border: '1px solid #d2d2d2',
    boxShadow: '0px 1px 10px -2px #807f7f',
    borderRadius: '15px',
    backgroundColor: '#FFF9F0',
    width: '70%',
    height: '88vh',
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

// Yup validation
const validationSchema = Yup.object({
  accountType: Yup.string()
    .oneOf(['operator', 'diner'], 'Invalid account type')
    .required('Required'),
  username: Yup.string()
    .min(4, 'Must be 4 to 8 chacaters')
    .max(8, 'Must be 4 to 8 chacaters')
    .required('Required'),
  password: Yup.string()
    .required('No password provided')
    .min(6, 'Must be 6 to 12 characters')
    .max(12, 'Must be 6 to 12 characters')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
      'Password needs at least one upper case letter, one lower case letter, and one numeric digit'
    ),
  email: Yup.string().email('Invalid email address').required('Required'),
  acceptedTerms: Yup.boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms of service'),
});

const RegisterForm = () => {
  const classes = useStyles();

  const history = useHistory();

  const routeToLogin = () => {
    history.push('/login');
  }

   // setting formik initial values
   const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      accountType: '',
      acceptedTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values.accountType === 'diner') {
        axios
          .post(
            'https://food-truck-trackr-api.herokuapp.com/api/auth/register/diner',
            {
              username: values.username,
              password: values.password,
              email: values.email,
            }
          )
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (values.accountType === 'operator') {
        axios
          .post(
            'https://food-truck-trackr-api.herokuapp.com/api/auth/register/operator',
            {
              username: values.username,
              password: values.password,
              email: values.email,
            }
          )
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.header}>
          <img alt={'foodtruck'} src={Image} className={classes.responsive} />
          <h5>Register</h5>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={
                formik.touched.accountType && Boolean(formik.errors.accountType)
              }>
              <InputLabel id='accountType'> Account Type</InputLabel>
              <Select
                native
                fullWidth
                labelId='accountType'
                id='accountType'
                name='accountType'
                value={formik.accountType}
                onChange={formik.handleChange}>
                <option aria-label='None' value='' />
                <option value='operator'>Operator</option>
                <option value='diner'>Diner</option>
              </Select>
              <FormHelperText className={classes.error}>
                {formik.touched.accountType && formik.errors.accountType}
              </FormHelperText>
            </FormControl>
          </Grid>
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
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
          <Grid item xs={12}>
            <Checkbox
              color='primary'
              id='acceptedTerms'
              name='acceptedTerms'
              checked={formik.terms}
              onChange={formik.handleChange}
            />
            I agree to all statements in the <Link to=''>terms of service</Link>
            <FormHelperText className={classes.error}>
              {formik.touched.acceptedTerms && formik.errors.acceptedTerms}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} className={classes.footer}>
            <Button
              fullWidth
              variant='contained'
              type='submit'
              onClick={routeToLogin}
              className={classes.button}
              disabled={!(formik.isValid && formik.dirty)}>
              {' '}
              Sign Up!
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterForm;