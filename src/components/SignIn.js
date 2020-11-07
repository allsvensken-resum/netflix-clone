import React, { useState, useEffect } from 'react';
import { Card, Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import authenStyle from '../styled-modules/AuthenStyle';
import { useAuth } from '../contexts/AuthProvider';


function Login() {
  const classes = authenStyle();
  const { signIn } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginErr, setLoginErr] = useState(null)

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signIned = await signIn(email, password);
      setLoginErr(null);
      history.push('/');
    } catch (err) {
      setLoginErr(err.message);
    }
  }

  useEffect(() => {
    setLoginErr(null);
  }, [password, email])

  return (
    <Card className={classes.container} variant='outlined'>
      <h2 style={{ marginTop: "3rem" }}>Sign In</h2>
      <form onSubmit={handleSignIn} class={classes.form}>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} type='email' className={classes.input} variant='filled' label="Email" />
        <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" className={classes.input} variant='filled' label="Password" />
        <Button type='submit' className={classes.button} variant="flilled">Sign In</Button>
        {loginErr && <Alert style={{ marginTop: '1rem', fontSize: '0.7rem' }} severity='error'>{loginErr}</Alert>}
      </form>
      <p style={{ marginTop: '2rem', textAlign: 'center' }}>New to Netflix? <Link to='/signup'>Sign up now.</Link></p>
    </Card >
  )
}

export default Login;