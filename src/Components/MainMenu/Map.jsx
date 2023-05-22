import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDistance } from "geolib";
import { QueryContext } from "../../Context/QueryContext";
import MarkerIcon from "../../Assets/MarkerIcon/MarkerIcon.png";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  marginTop: "100px",
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MyMap() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const queryContext = useContext(QueryContext);
  const queryData = queryContext && queryContext.queryData;
  const setQueryData = queryContext && queryContext.setQueryData;

  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      const colRef = collection(db, "Restaurants");
      const stateQuery = query(
        colRef,
        where("isAccepted", "==", true),
        where("field", "==", queryData)
      );

      getDocs(stateQuery)
        .then((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().lat && doc.data().lng) {
              const distance = getDistance(
                {
                  latitude: currentLocation.lat,
                  longitude: currentLocation.lng,
                },
                { latitude: doc.data().lat, longitude: doc.data().lng }
              );
              if (distance <= 3000) {
                // 3km
                docs.push({ ...doc.data(), id: doc.id });
              }
            }
          });
          setData(docs);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [currentLocation, queryData]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
      onLoad={() => {
        setIsLoaded(true);
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={16}
        options={options}
      >
        {isLoaded && (
          <Marker
            position={currentLocation}
            icon={{
              url: MarkerIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
        {data.map((restaurant, idx) => (
          <Marker
            onClick={() => {
              navigate(`/Restaurant/${restaurant.id}`);
            }}
            key={idx}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;
