import { useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

const UserLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState(null);
  //   const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  // If user location is resolved then latitude and
  // longitude is obtained
  const success = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMessage('');
    setIsFindingLocation(false);
  };
  // If user location is not resolved
  const error = () => {
    setLocationErrorMessage('Unable to retrieve your location');
    setIsFindingLocation(false);
  };
  // Location track function
  const handleTrackLocation = () => {
    // Obtained from the Geolocation API
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMessage('Geolocation is not supported by your browser');
      setIsFindingLocation(false);
    } else {
    //   status.textContent = 'Locating…';
    // getCurrentPosition passes position value to the success function
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    locationErrorMessage,
    handleTrackLocation,
    isFindingLocation,
  };
};

export default UserLocation;
