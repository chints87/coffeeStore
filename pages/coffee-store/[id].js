import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetchCoffeeStores } from '../../lib/fetch-coffee-stores';
import { isEmpty } from '../../lib/is-empty';
import { StoreContext } from '../../store/store-context';
import Layout from '@/components/Layout';
// import { IsEmpty } from '../../lib/is-empty';

// initialCoffeeStore since this is obtained
// from pre-rendered pages at build
export default function CoffeeStore({ initialCoffeeStore }) {
  const router = useRouter();

  // Retreive id from path
  const { id } = router.query;

  // Obtain context state
  const { state: { coffeeStores } } = useContext(StoreContext);

  // Create a coffeeStore state from user's location
  const [coffeeStore, setCoffeeStore] = useState(initialCoffeeStore);

  // Create vote count status
  const [votingCount, setVotingCount] = useState(0);

  // Create coffee store record on airtable by calling an api
  const handleCreateCoffeeStore = async (userFetchedCoffeeStore) => {
    try {
      const {
        id: identity, name, address, neighbourhood, imgUrl,
      } = userFetchedCoffeeStore;
      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `${identity}`,
          name,
          address,
          neighbourhood: neighbourhood || '',
          voting: 0,
          imgUrl: imgUrl || '',
        }),
      });
      const dbCoffeeStore = await response.json();
      console.log(dbCoffeeStore);
    } catch (error) {
      console.error('Error creating coffee store', error);
    }
  };

  // SWR data
  const { data: fetchedSWRdata, error: err } = useSWR(
    `/api/getCoffeeStoreById?id=${id}`,
    (url) => fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (fetchedSWRdata && fetchedSWRdata.length > 0) {
      console.log('SWRdata', fetchedSWRdata);
      setCoffeeStore(fetchedSWRdata[0]);
      setVotingCount(fetchedSWRdata[0].voting);
    }
  }, [fetchedSWRdata]);

  // For CSR when coffee stores is available in context
  useEffect(() => {
    if (isEmpty(initialCoffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (userLocationCoffeeStore) => userLocationCoffeeStore.id.toString() === id,
        );
        if (findCoffeeStoreById) {
          setCoffeeStore(findCoffeeStoreById);
          handleCreateCoffeeStore(findCoffeeStoreById);
        }
      }
    } else {
      // For SSG coffee stores
      handleCreateCoffeeStore(initialCoffeeStore);
    }
  }, [id, coffeeStores, initialCoffeeStore]);

  if (err) {
    return <div>Something went wrong to retrieve coffee store page</div>;
  }

  // Checks if fallback is true in getstatic paths, then loading
  // is shown until the HTML and JSON data is populated in it
  if (router.isFallback) {
    return <div style={{ color: 'yellow' }}>Loading</div>;
  }

  const handleUpVote = async () => {
    // Updates in airtable and if succesful then
    // local state for votingCount is updated
    try {
      const response = await fetch('/api/likeCoffeeStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const dbCoffeeStore = await response.json();
      if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        const count = votingCount + 1;
        setVotingCount(count);
      }
    } catch (error) {
      console.error('Error like coffee store', error);
    }
  };

  return (
    <Layout title="Coffee Shops">
      <h1>
        Coffee Shop page
        {' '}
        {router.query.id}
      </h1>
      <p>{coffeeStore.name}</p>
      {coffeeStore.address && <p>{coffeeStore.address}</p>}
      {coffeeStore.neighbourhood && <p>{coffeeStore.neighbourhood}</p>}
      <p>{votingCount}</p>
      <button className="btn" type="button" onClick={() => handleUpVote()}>
        Up Vote
      </button>
      <Link href="/">
        <a><h1>Back home</h1></a>
      </Link>
    </Layout>
  );
}

// An array of static path is returned
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

// For a static path that exists but not pre-rendered
// the getStaticProps will run and then then HTML will be generated
// in the background by next js. While it is preparing HTML and filling
// data a loading state is seen
export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id,
  );
  return {
    props: {
      initialCoffeeStore: findCoffeeStoreById || {},
    },
  };
}
