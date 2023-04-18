import { Container } from '@mui/material';
import { useState, useEffect } from 'react';

function Map() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <Container>
      {latitude && longitude && (
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93212.75502051478!2d${latitude}!3d${longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE2JzQwLjUiTiA2MMKwMTcnMjQuMyJF!5e0!3m2!1str!2str!4v1648870208786!5m2!1str!2str`}
          width="100%"
          style={{marginTop: "90px"}}
          height="350"
        ></iframe>
      )}
    </Container>
  );
}

export default Map;
