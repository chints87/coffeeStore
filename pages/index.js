import { fetchCoffeeStores } from 'lib/fetch-coffee-stores';
import Layout from '@/components/Layout';
import Banner from '@/components/Banner';
import CardLayout from '@/components/CardLayout';
// import coffeeStores from '../data/coffee-stores.json';

export default function EventsPage({ coffeeStores }) {
  return (
    <Layout title="Coffee Connoisseur">
      <Banner buttonText="View Stores" />
      <CardLayout coffeeStores={coffeeStores} />
    </Layout>
  );
}

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}
