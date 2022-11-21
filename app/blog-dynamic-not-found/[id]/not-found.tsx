import Link from 'next/link';
import styles from '../../page.module.css';

const NotFound = () => {
  return (
    <main className={styles.main}>
      <p>記事データが存在しません</p>
      <Link href="/" className={styles.card}>
        ホームへ戻る
      </Link>
    </main>
  );
};
export default NotFound;
