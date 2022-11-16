import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/blog" className={styles.card}>
            <h2>Blog（SSG版）</h2>
            <p>ビルド時にSSGされたBlogはこちら</p>
          </Link>

          <Link href="/blog-dynamic" className={styles.card}>
            <h2>Blog（動的生成版）</h2>
            <p>アクセス時にサーバーでプリレンダリングされるBlogはこちら</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
