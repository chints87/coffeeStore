import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function CoffeeStore() {
  const router = useRouter();
  return (
    <Layout title="Coffee Shops">
      <h1>
        Coffee Shop page
        {' '}
        {router.query.id}
      </h1>
      <Link href="/">
        <a><h1>Back home</h1></a>
      </Link>
    </Layout>
  );
}
