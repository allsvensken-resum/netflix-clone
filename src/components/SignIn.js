import React from 'react';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import authenStyle from '../styled-modules/AuthenStyle';

function Login() {
  const classes = authenStyle();
  return (
    <Card className={classes.container} variant='outlined'>
      <h2 style={{ marginTop: "3rem" }}>Sign In</h2>
      <form class={classes.form}>
        <TextField type='email' className={classes.input} variant='filled' label="Email" />
        <TextField type="password" className={classes.input} variant='filled' label="Password" />
        <Button className={classes.button} variant="flilled">Sign In</Button>
        <p style={{ marginTop: '2rem', textAlign: 'center' }}>New to Netflix? <Link to='/signup'>Sign up now.</Link></p>
      </form>
    </Card >
  )
}

export default Login;