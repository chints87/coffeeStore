const getCoffeeStores = (latLong, query) => `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}`;

// By default it will take latLong coords given, upon user allowing
// to use their geolocation the latLong value is updated
export const fetchCoffeeStores = async (latLong = '23.002272,72.502243') => {
  const response = await fetch(getCoffeeStores(latLong, 'coffee stores'), {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });

  const data = await response.json();

  const coffeeStores = data?.results?.map((venue) => ({
    id: venue.fsq_id,
    ...venue,
  })) || [];

  return coffeeStores;
};
