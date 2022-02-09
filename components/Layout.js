import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import styles from '@/styles/scss/Layout.module.scss';

export default function Layout({
  title, description, keywords, children,
}) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {/* Add a hero photo over here */}
      { router.pathname === '/' }
      <div className={styles.container}>
        { children }
      </div>
      <Footer />
    </div>

  );
}

Layout.defaultProps = {
  title: 'App Name | App description',
  description: 'What the webapp is about',
  keywords: 'is, a, keyword,',
};
