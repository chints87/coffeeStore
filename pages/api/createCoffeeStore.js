import { table, getRecordFields, findCoffeeStoreById } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
//  find a record to check if it exists
  if (req.method === 'POST') {
    const {
      id, name, address, neighbourhood, voting, imgUrl,
    } = req.body;
    try {
      if (id) {
        // Retreive coffee store from airtable with id obtained from query
        const coffeeStoreRecord = await findCoffeeStoreById(id);
        if (coffeeStoreRecord.length !== 0) {
          res.status(200).json(coffeeStoreRecord);
        } else {
        // create a record
          if (name) {
            const createStoreRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const coffeeStoreRecordCreated = getRecordFields(createStoreRecord);
            res.json(coffeeStoreRecordCreated);
          }
          res.status(400).json({ message: 'Id or name is missing' });
        }
      } else {
        res.status(400).json({ message: 'Id is missing' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error finding or creating a store', err });
    }
  }
};

export default createCoffeeStore;
