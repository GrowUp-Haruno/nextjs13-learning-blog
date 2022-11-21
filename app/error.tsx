'use client';

import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <p>通信エラーが発生しました!</p>
      <Link href="/" className={styles.card}>
        ホームへ戻る
      </Link>
    </main>
  );
}
