import { fetchCoffeeStores } from '../../lib/fetch-coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit } = req.query;
  try {
    const response = await fetchCoffeeStores(latLong, limit);
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ messsage: 'There was an error', error });
  }
};

export default getCoffeeStoresByLocation;
