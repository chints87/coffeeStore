import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchCoffeeStores } from 'lib/fetch-coffee-stores';
import Layout from '@/components/Layout';

export default function CoffeeStore({ coffeeStore }) {
  const router = useRouter();

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
      <p>{coffeeStore.location.address}</p>
      <p>{coffeeStore.neighbourhood}</p>
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
  return {
    props: {
      coffeeStore: coffeeStores.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id,
      ),
    },
  };
}
