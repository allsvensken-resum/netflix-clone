import React, { useEffect, useState } from 'react';
import './Poster.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import instance from '../axios';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { db, auth } from '../firebase';
import firebase from 'firebase';

const useStyles = makeStyles({
  popup: {
    width: '80vw',
    height: '50vh',
    backgroundColor: 'transparent'
  }
})

function Posters({ id, title, backdrop_path, overview, poster_path, vote_average, deleteButton = false }) {

  const classes = useStyles();
  const imageBaseURL = 'https://image.tmdb.org/t/p/original/';
  const [rateColor, setRateColor] = useState(null);
  const [open, setOpen] = useState(false);
  const [trailerID, setTrailerID] = useState('');
  const [favoriteAdded, setFavoriteAdded] = useState(false);

  const fetchTrailerID = async (query) => {
    const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.REACT_APP_FIREBASE_YOUTUBE_API_KEY}&q=${query}`
    const resp = await instance.get(youtubeURL);
    setTrailerID(resp.data.items[0].id.videoId);
  }

  useEffect(() => {
    //Set rating color depends on rating values.
    vote_average >= 8 ? setRateColor({ color: '#51d624' })
      : vote_average > 6 ? setRateColor({ color: 'orange' })
        : setRateColor({ color: 'red' })
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(auth.currentUser.uid.toString()).collection('favorites').doc(id.toString())
    .onSnapshot(snapshot => {
      if(snapshot.data() && !deleteButton) {
        setFavoriteAdded(true);
      } else {
        setFavoriteAdded(false);
      }
    })
    return unsubscribe;
  }, [])

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    // Fetch the trailer from youtube.
    if (title) {
      fetchTrailerID(`${title} Trailers`);
    }
    setOpen(true);
  }

  const handleAddFavorite = () => {
    if (!deleteButton) {
      db.collection('users').doc(auth.currentUser.uid).collection('favorites')
        .doc(id.toString()).set({
          id: id,
          title: (title ? title : null),
          backdrop_path: (backdrop_path ? backdrop_path : null),
          overview: (overview ? overview : null),
          poster_path: (poster_path ? poster_path : null),
          vote_average: (vote_average ? vote_average : null),
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
          // youtube_id: trailerID
        }).then(() => {
        }).catch((error) => {
            
        })
    } else {
      db.collection('users').doc(auth.currentUser.uid).collection('favorites')
        .doc(id.toString()).delete()
        .then(() => {
        })
    }
  }

  return (
    <div className="poster">
      <img className='poster__img' alt={title} src={`${imageBaseURL}${poster_path}`} />
      <div className='poster__info'>
        <div className='poster__header'>
          <div className='poster__overview'>Overview</div>
          <div style={rateColor} className='poster__vote'>{vote_average}</div>
          {title && <button onClick={handleOpen} className='poster__playbutton'>
            <PlayArrowIcon fontSize='inherit' />
          </button>}
          <IconButton disabled={favoriteAdded} color='primary' onClick={handleAddFavorite} size='small' style={{
            fontSize: '1.3vw',
            widtht: 'auto',
            height: 'auto',
            outline: 'none'
          }}
          >
            {deleteButton ? <HighlightOffOutlinedIcon color='secondary' fontSize='inherit' />
              : <AddCircleOutlineIcon fontSize='inherit' />}
          </IconButton>
        </div>
        <div className='poster__item'>
          {overview}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <iframe
          src={`https://www.youtube.com/embed/${trailerID}`}
          frameborder="0"
          allowfullscreen="allowfullscreen">
        </iframe>
      </Dialog>
    </div>
  )
}

export default Posters
