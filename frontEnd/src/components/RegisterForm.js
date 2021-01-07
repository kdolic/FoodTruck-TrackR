import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Image from '../images/foodtruck.png';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Box,
  Button,
  Checkbox,
  TextField,
  InputLabel,
  FormHelperText,
  FormControl,
} from '@material-ui/core/';
import Axios from 'axios';

// Styles for the form components
const useStyles = makeStyles(theme => ({
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
  // setting component styles
  const classes = useStyles();

  // setting formik initial values
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      acceptedTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
              checked={formik.values.acceptedTerms}
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
              className={classes.button}
              disabled={!(formik.isValid && formik.dirty)}>
              Sign Up!
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
function App() {
  return (
    <Container maxWidth='sm'>
      <RegisterForm />
    </Container>
  );
}
export default App;
