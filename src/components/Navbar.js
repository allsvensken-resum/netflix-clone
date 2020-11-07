import React from 'react';
import FlexRow from '../styled-components/FlexRow';
import './Navbar.css';
import Button from '@material-ui/core/Button';

function Navbar() {
  return (
    <div className="nav">
      <h3>NETFLIX</h3>
      <ul className='nav-link'>
        <li>Home</li>
        <li>TV Shows</li>
        <li>Movies</li>
        <li>Latest</li>
        <li>My list</li>
      </ul>
      <Button style={{ marginRight: '2rem' }} size={'small'} variant="contained" color="secondary">
        Log out</Button>
    </div>
  )
}

export default Navbar
