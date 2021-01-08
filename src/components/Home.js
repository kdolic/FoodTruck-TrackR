import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
  } from '@material-ui/core/';
import MainLogo from '../images/Main Logo.png';

import diner from '../images/diner.png';
import truck from '../images/truck.png';
import { red } from '@material-ui/core/colors';
import Axios from 'axios';
const useStyles = makeStyles(theme => ({
container: {
    margin: '60px auto',
    border: '1px solid #d2d2d2',
    boxShadow: '0px 1px 10px -2px #807f7f',
    borderRadius: '20px',
    backgroundColor: '#FFF9F0',
    width: '100%',
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
    marginTop: '2%',
    marginBottom: '5%',
    '@media (max-width: 550px)': {
      marginBottom: '10%',
    },
  },
  h2: {
    fontSize: '1.2rem',
    marginTop: '2%',
  },
  nav: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '1%',
    marginBottom: '5%',
    '@media (max-width: 550px)': {
      marginBottom: '10%',
    },
  },
  responsive: {
    '@media (max-width: 550px)': {
      width: '30%',
      height: 'auto', 
    },
  },
  button: {
    width: '50%',
    padding: '5% 60%',
    marginTop: '60%',
    backgroundImage: 'linear-gradient(#FFAD33, #BF8124)',
    color: '#fff9f0',
    '@media (max-width: 550px)': {
        width: '25%',
        height: 'auto', 
      },
  },
  footer: {
    marginTop: '5%',
    textAlign: 'center',
  },
}));

function Home() {
    const classes = useStyles();

  const history = useHistory();

  const routeToRegister = () => {
    history.push('/register');
  }

    return (
        <>
        <div className={classes.container}>
        <header className={classes.header}>
            <Box className={classes.nav}>
                <Link to='/' style={{ textDecoration: 'none', color: 'white', }}>FOODTRUCK TRACKR</Link>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            </Box>
            <img src={MainLogo} alt={'foodtruck'} className={classes.responsive} />
            <h2 className={classes.h2}>FoodTruck TrackR was designed to make finding and eating at a food truck fast, easy and fun.</h2>
        </header>

        <Box style={{display: 'flex', justifyContent: 'center'}}>
            <Box style={{display: 'flex', flexDirection: 'column', margin: '5%', alignItems: 'center'}}>
                <Box style={{marginBottom: '10%'}}><img src={diner} style={{height: '20vh'}} /></Box>
                <Box><Button onClick={routeToRegister} className={classes.button}>Diner</Button></Box>
            </Box>
            <Box style={{display: 'flex', flexDirection: 'column', margin: '5%', alignItems: 'center'}}>
                <Box style={{marginBottom: '0%'}}><img src={truck} style={{height: '20vh'}} /></Box>
                <Box><Button onClick={routeToRegister} className={classes.button}>Operator</Button></Box>
            </Box>
        </Box>

        <footer className={classes.footer}>© 2021 FOODTRUCK TRACKR. All rights  reserved.
        </footer>
        </div>
        </>
    )
}

export default Home
