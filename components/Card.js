import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/scss/Card.module.scss';

export default function Card({ name, imgUrl, href }) {
  return (
    <div className={styles.container}>
      <Link href={href}>
        <a>
          <h2>{name}</h2>
          <Image src={imgUrl} alt={name} width={100} height={100} />
        </a>
      </Link>

    </div>
  );
}
