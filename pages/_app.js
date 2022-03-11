import StoreProvider from '../store/store-context';
import '../styles/scss/globals.scss';

/* export function reportWebVitals(metric) {
  console.log(metric)
} */

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
