import React from 'react';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import authenStyle from '../styled-modules/AuthenStyle';

function Signup() {

  const classes = authenStyle();
  return (
    <Card className={classes.container} variant='outlined'>
      <h2 style={{ marginTop: "3rem" }}>Sign Up</h2>
      <form class={classes.form}>
        <TextField type='email' className={classes.input} variant='filled' label="Email" />
        <TextField type="password" className={classes.input} variant='filled' label="Password" />
        <Button className={classes.button} variant="flilled">Sign up</Button>
        <p style={{ marginTop: '2rem', textAlign: 'center' }}>Have an account already? <Link to='/signin'>Sign in.</Link></p>
      </form>
    </Card >
  )
}

export default Signup
