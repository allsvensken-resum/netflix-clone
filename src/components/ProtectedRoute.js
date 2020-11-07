import React, { useEffect } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

function ProtectedRoute({ component: Component, ...rest }) {

  const { user } = useAuth();

  return (
    <Route {...rest} render={(props) => {
      return user ? <Component {...props} />
        : <Redirect to='/login' />
    }} />
  )
}

export default ProtectedRoute
