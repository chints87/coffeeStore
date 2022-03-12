const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

// Return record ID and fields only from the json recevied from airtable
const getRecordFields = (record) => record.map((singleRecord) => ({
  recordID: singleRecord.id,
  ...singleRecord.fields,
}));

// Find a record from airtable using id filter
const findCoffeeStoreById = async (id) => {
  const findCoffeeStoreRecord = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();
  // If array length is not 0, then obtain record and return it to the
  // user
  if (findCoffeeStoreRecord.length !== 0) {
    return getRecordFields(findCoffeeStoreRecord);
  }
  return [];
};

export { table, getRecordFields, findCoffeeStoreById };
