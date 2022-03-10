import React from 'react';
import styles from '@/styles/scss/CardLayout.module.scss';
import Card from './Card';

export default function CardLayout({ coffeeStores }) {
  return (
    <div className={styles.container}>
      {coffeeStores.map((store) => (
        <Card
          key={store.id}
          className={styles.card}
          imgUrl={store.imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'}
          name={store.name}
          href={`/coffee-store/${store.id}`}
        />
      ))}
    </div>
  );
}
