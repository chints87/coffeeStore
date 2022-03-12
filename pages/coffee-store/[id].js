import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  // Checks if fallback is true in getstatic paths, then loading
  // is shown until the HTML and JSON data is populated in it
  if (router.isFallback) {
    return <div style={{ color: 'yellow' }}>Loading</div>;
  }

  const handleUpVote = () => {
    console.log('in handle upvote function');
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
