import { findCoffeeStoreById } from '../../lib/airtable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      // Retreive coffee store from airtable with id obtained from query
      const coffeeStoreRecord = await findCoffeeStoreById(id);
      if (coffeeStoreRecord.length !== 0) {
        res.status(200).json(coffeeStoreRecord);
      } else {
        res.status(400).json({ message: 'id could not be found' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export default getCoffeeStoreById;
