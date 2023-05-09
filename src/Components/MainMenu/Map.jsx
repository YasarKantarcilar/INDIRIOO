import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getDistance } from "geolib";
import { QueryContext } from "../../Context/QueryContext";

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
              console.log(distance);
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
  console.log(data);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
        options={options}
      >
        <Marker position={currentLocation} />
        {data.map((restaurant, idx) => (
          <Marker
            key={idx}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;
