import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchCoffeeStores } from 'lib/fetch-coffee-stores';
import { isEmpty } from 'lib/is-empty';
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
  const { state } = useContext(StoreContext);
  console.log(state);

  // Create a coffeeStore state from user's location
  const [coffeeStore, setCoffeeStore] = useState(initialCoffeeStore);
  console.log(coffeeStore);
  console.log(coffeeStores);
  useEffect(() => {
    console.log('in useEffect before first if statement');
    if (isEmpty(initialCoffeeStore)) {
      console.log('in useEffect before second if statement');
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (userLocationCoffeeStore) => userLocationCoffeeStore.id.toString() === id,
        );
        setCoffeeStore(findCoffeeStoreById);
        console.log('in useEffect');
      }
    }
  }, [id, coffeeStore, initialCoffeeStore, coffeeStores]);

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
      {coffeeStore.location?.address && <p>{coffeeStore.location.address}</p>}
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
