import './App.css';
import React, { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './contexts/AuthProvider';
import { Helmet } from 'react-helmet';

function App() {


  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path='/' component={MainPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
