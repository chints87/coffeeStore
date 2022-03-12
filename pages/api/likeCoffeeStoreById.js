import { table, findCoffeeStoreById, getRecordFields } from '../../lib/airtable';

const likeCoffeeStoreById = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.body;
      if (id) {
        const coffeeStoreRecord = await findCoffeeStoreById(id);
        if (coffeeStoreRecord.length !== 0) {
          // Get record
          const record = coffeeStoreRecord[0];
          // Update vote key in this record
          // eslint-disable-next-line radix
          const upvote = parseInt(record.voting) + parseInt(1);
          // Add this update to the db in airtable
          const updateRecord = await table.update([
            {
              id: record.recordID,
              fields: {
                voting: upvote,
              },

            }],
          );
          console.log(updateRecord);
          if (updateRecord) {
            const likeUpdateRecord = getRecordFields(updateRecord);
            res.status(200).json(likeUpdateRecord);
          } else {
            res.status(500).json({ message: 'Could not update record' });
          }
        } else {
          res.status(200).json({ message: 'Coffee store does not exist', id });
        }
      }
    } catch (error) {
      res.status(500).json({ message: 'Error upvoting', error });
    }
  } else {
    res.status(500).json({ message: `${req.method} is not allowed` });
  }
};

export default likeCoffeeStoreById;
