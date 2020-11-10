import React from 'react';
import FlexRow from '../styled-components/FlexRow';
import './Navbar.css';
import Button from '@material-ui/core/Button';

function Navbar({ handleSignOut }) {
  return (
    <div className="nav">
      <h3 style={{ fontSize: '4vw' }}>NETFLIX</h3>
      <ul className='nav-link'>
        <li>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>Latest</li>
        <li>My list</li>
      </ul>
      <Button className="nav-button" onClick={handleSignOut} style={{ fontSize: '1vw', height: '2vw', marginRight: '2vw', width: '10%', maxWidth: 200 }} variant="contained" color="secondary">
        Log out</Button>
    </div>
  )
}

export default Navbar
