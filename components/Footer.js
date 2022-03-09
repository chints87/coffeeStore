import styles from '@/styles/scss/Footer.module.scss';

export default function Footer({ companyName }) {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy;
        {' '}
        { companyName }
      </p>
    </footer>
  );
}

Footer.defaultProps = {
  companyName: 'Add Company name',
};
