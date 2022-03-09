import Layout from '@/components/Layout';
import Banner from '@/components/Banner';

export default function EventsPage() {
  return (
    <Layout title="Coffee Connoisseur">
      <Banner buttonText="View Stores" />
    </Layout>
  );
}

/* This function is executed first before the
 component function */
export async function getStaticProps() {
  /* Pre-generate a page i.e the
  HTML and data - prepared from server side -
  content during build time */

  /* Run server side code */

  /* Code doesnt get bundled, which is
     sent to the client side */

  /* Prefetch data before this component
     is created */
  return {
    props: {},
  };
}

/* THIS CODE IS EXECUTED ONLY DURING
BUILD TIME OR DEV SERVER */
