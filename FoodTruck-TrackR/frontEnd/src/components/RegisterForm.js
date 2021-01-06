import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Box,
  FormHelperText,
  Button,
  Select,
  Checkbox,
  TextField,
} from '@material-ui/core/';
import foodtruck from '../images/foodtruck.png';
import { red } from '@material-ui/core/colors';
import Axios from 'axios';
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
  label: {
    marginLeft: '3%',
    '@media (max-width: 550px)': {
      fontSize: '0.75rem',
    },
  },
  fields: {
    width: '94%',
    marginLeft: '3%',
    '@media (max-width: 550px)': {
      fontSize: '0.75rem',
    },
  },
  error: {
    fontSize: '0.75rem',
    color: red[600],
    width: '100%',
    marginTop: '0.25rem',
    marginLeft: '1%',
    '&::before': {
      content: '":x: "',
      fontSize: '0.65rem',
    },
  },
  button: {
    width: '30%',
    marginLeft: '35%',
    padding: '1% 0',
    backgroundImage: 'linear-gradient(#FFAD33, #BF8124)',
    color: 'white',
  },
  footer: {
    marginBottom: '5%',
  },
}));

export default function RegisterForm(){
  const classes = useStyles();
  const FormTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <TextField
          id='standard-basic'
          className={classes.fields}
          width={1}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <FormHelperText className={classes.error}>
            {meta.error}
          </FormHelperText>
        ) : null}
      </>
    );
  };
  const FormCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className='checkbox'>
          <Checkbox {...field} {...props} type='checkbox' />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <FormHelperText className={classes.error}>
            {meta.error}
          </FormHelperText>
        ) : null}
      </>
    );
  };
  const FormSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Select
          native
          value='accounttype'
          {...field}
          {...props}
          className={classes.fields}
        />
        {meta.touched && meta.error ? (
          <FormHelperText className={classes.error}>
            {meta.error}
          </FormHelperText>
        ) : null}
      </>
    );
  };
  return (
    <>
      <Formik
        initialValues={{
          accountType: '',
          username: '',
          password: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          accountType: Yup.string()
            .oneOf(['operator', 'diner'], 'Invalid account type')
            .required('Required'),
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
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await new Promise(r => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }}>
        <Form className={classes.container}>
          <Box className={classes.header}>
            <img alt={'foodtruck'} src={foodtruck} className={classes.responsive} />
            <h5>Register</h5>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <label className={classes.label} htmlFor='accountType'>
                  ACCOUNT TYPE
                </label>
              </Box>
              <FormSelect id='accountType' name='accountType'>
                <option aria-label='None' value='' />
                <option value='operator'>Operator</option>
                <option value='diner'>Diner</option>
              </FormSelect>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <label className={classes.label} htmlFor='username'>
                  USERNAME
                </label>
              </Box>
              <FormTextInput
                id='username'
                name='username'
                type='text'
                width={1}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <label className={classes.label} htmlFor='email'>
                  E-MAIL
                </label>
              </Box>
              <FormTextInput id='email' name='email' type='email' />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <label className={classes.label} htmlFor='password'>
                  PASSWORD
                </label>
              </Box>
              <FormTextInput id='password' name='password' type='password' />
            </Grid>
            <Grid item xs={12}>
              <FormCheckbox name='acceptedTerms' >
                I agree to all statements in the{' '}
                <Link to=''>terms of service</Link>
              </FormCheckbox>
            </Grid>
            <Grid item xs={12} className={classes.footer}>
              <Button
                variant='contained'
                type='submit'
                className={classes.button}>
                Sign Up!
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};
