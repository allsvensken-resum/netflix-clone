import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import authenStyle from '../styled-modules/AuthenStyle';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { Alert } from '@material-ui/lab';

function Signup() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const history = useHistory();
  const { signUp } = useAuth();
  const [signUpErr, setSignUpErr] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setSignUpErr(null);
      if (password !== confirmPassword) {
        setSignUpErr('Check your password confirmation ! ');
        return
      }
      const signedUp = await signUp(email, password);
      history.push('/');
    } catch (err) {
      setSignUpErr(err.message);
    }
  }

  useEffect(() => {
    setSignUpErr(null);
  }, [email, password, confirmPassword])

  const classes = authenStyle();
  return (
    <Card style={{
      height: 580
    }} className={classes.container} variant='outlined'>
      <h2 style={{ marginTop: "3rem" }}>Sign Up</h2>
      <form onSubmit={handleSignUp} class={classes.form}>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} type='email' className={classes.input} variant='filled' label="Email" />
        <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" className={classes.input} variant='filled' label="Password" />
        <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className={classes.input} variant='filled' label="Password confirmation" />
        <Button style={{ marginTop: '2rem' }} type='submit' className={classes.button} variant="flilled">Sign up</Button>
        {signUpErr && <Alert severity='error' style={{ fontSize: '0.7rem', marginTop: '1rem' }}>{signUpErr}</Alert>}
      </form>
      <p style={{ marginTop: '2rem', textAlign: 'center' }}>Have an account already? <Link to='/signin'>Sign in.</Link></p>
    </Card >
  )
}

export default Signup
