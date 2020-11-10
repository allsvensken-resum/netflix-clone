import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import authenStyle from '../styled-modules/AuthenStyle';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { Alert } from '@material-ui/lab';
import { auth, db } from '../firebase';

function Signup() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const history = useHistory();
  const { signUp } = useAuth();
  const [signUpErr, setSignUpErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setSignUpErr(null);
      if (password !== confirmPassword) {
        setSignUpErr('Check your password confirmation ! ');
        setLoading(false);
        return
      }
      const signedUp = await signUp(email, password);
      db.collection('users').doc(auth.currentUser.uid)
        .set({
          email: auth.currentUser.email,
        }).then(() => {
          history.push('/');
        })
    } catch (err) {
      setSignUpErr(err.message);
    }
    setLoading(false);
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
        {!loading ? <Button disabled={loading} type='submit' className={classes.button} variant="flilled">Sign up</Button>
          : <Button disabled={loading} type='submit' className={classes.button} variant="flilled">
            <CircularProgress size={25} color='primary' />
          </Button>}
        {signUpErr && <Alert className={classes.alert} severity='error'>{signUpErr}</Alert>}
      </form>
      <p style={{ marginTop: '2rem', textAlign: 'center' }}>Have an account already? <Link to='/signin'>Sign in.</Link></p>
    </Card >
  )
}

export default Signup
