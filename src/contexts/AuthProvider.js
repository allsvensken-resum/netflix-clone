import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext)
};

function AuthProvider({ children }) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Event listenting for authentication state changed (sometime with token).
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      //Keep status loading untill authentication state is changed.
      setLoading(false);
    })
    return unsubscribe;
  }, [])


  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const signOut = () => {
    return auth.signOut();
  }

  const value = {
    user,
    signIn,
    signOut,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Array destructuring */}
      {/*-  Do not share the context value untill authentication state is changed. 
         - To protect the redirect when the authentication is not done yet.
         - Sequence (Authentication => share context => check user in another route that use context.)
      */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
