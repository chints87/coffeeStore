import React, { useEffect, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';
// import { fetchCoffeeStores } from '../lib/fetch-coffee-stores';
import styles from '@/styles/scss/Banner.module.scss';
import userLocation from '../hooks/user-location';
import CardLayout from './CardLayout';

export default function Banner({ buttonText }) {
  // Extract values and functions from hook
  const {
    handleTrackLocation, locationErrorMessage, isFindingLocation,
  } = userLocation();

  const { dispatch, state } = useContext(StoreContext);

  const { latLong, coffeeStores } = state;
  // If user approves of using geoloation then, with the new values
  // of the geolocation call fetchCoffee stores

  useEffect(() => {
    const fetchCoffeeLocations = async () => {
      if (latLong) {
        try {
          const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
          const fetchUserLocationCoffeeStores = await response.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchUserLocationCoffeeStores },
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchCoffeeLocations();
  }, [latLong, dispatch]);
  return (
    <>
      <div className={styles.container}>
        <h1>Coffee Connoisseur</h1>
        <p>Subtitle</p>
        {/* Click to obtain user location */}
        <button
          type="button"
          className="btn"
          onClick={() => handleTrackLocation()}
        >
          {isFindingLocation ? 'Locating...' : <span>{buttonText}</span>}
        </button>
        {locationErrorMessage && <p>{locationErrorMessage}</p>}
      </div>
      {coffeeStores ? <CardLayout coffeeStores={coffeeStores} /> : null}
    </>

  );
}
