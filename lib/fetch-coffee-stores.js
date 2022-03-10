const getCoffeeStores = (latLong, query) => `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}`;

export const fetchCoffeeStores = async () => {
  const response = await fetch(getCoffeeStores('23.002272,72.502243', 'coffee stores'), {
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
