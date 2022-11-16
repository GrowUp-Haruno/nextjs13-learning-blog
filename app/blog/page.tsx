import Link from 'next/link';
import { getPosts } from '../../src/lib/getJsonPlaceholder';
import styles from '../page.module.css';

const page = async () => {
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Blog List</h1>
        <div className={styles.grid}>
          {posts.map(({ id, title }) => (
            <Link key={id} href={`/blog/${id}`}>
              <div className={styles.card}>{title}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
export default page;
