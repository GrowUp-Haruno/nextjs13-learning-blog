import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
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

        <Link href="/blog-dynamic-error" className={styles.card}>
          <h2>Blog（フェッチエラー版）</h2>
          <p>プリレンダリング中にサーバー側で通信エラーを発生した時の挙動はこちら</p>
        </Link>
      </div>
    </main>
  );
}
