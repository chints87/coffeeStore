import Link from 'next/link';
import styles from '@/styles/scss/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>LOGO</a>
        </Link>
      </div>
    </header>
  );
}
