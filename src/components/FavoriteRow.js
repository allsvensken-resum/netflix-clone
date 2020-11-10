import React, { useState, useEffect } from 'react';
import Poster from './Posters';
import FlexRow from '../styled-components/FlexRow';
import Carousel from 'react-bootstrap/Carousel';
import { db, auth } from '../firebase';

function FavoriteRow({ title, style }) {

  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsDisplay, setItemDisplay] = useState(1);
  const [slider, setSlider] = useState();
  const [index, setIndex] = useState(0);

  //Fetch the movie data.
  useEffect(() => {
    const unsubscribe = db.collection('users')
      .doc(auth.currentUser.uid).collection('favorites')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        setPosters(snapshot.docs.map(
          doc => <Poster key={doc.id} deleteButton={true} {...doc.data()} />
        ))
      })
    return unsubscribe;
  }, [])

  useEffect(() => {
    if (posters.length !== 0) {
      setIndex(posters.length-1);
    }
  }, [posters])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };



  return (posters.length !== 0 &&
    (<div style={style}>
      <p className='font-weight-bold' style={{ fontSize: '2vw', marginLeft: '1.5rem', marginBottom: '.5vw', color: 'white', fontFamily: 'Helvetica' }}>{title}</p>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {
          posters.map((poster, index) => {
            return <Carousel.Item key={index}>
              <FlexRow width={'100%'} style={{ marginBottom: '1rem', justifyContent: 'space-around', padding: '1vw' }}>
                {poster}
              </FlexRow>
            </Carousel.Item>
          })
        }
      </Carousel>
    </div>)
  )
}

export default FavoriteRow
