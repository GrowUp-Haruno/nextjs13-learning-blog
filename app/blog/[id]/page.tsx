import { getPost, getPosts } from '../../../src/lib/getJsonPlaceholder';
import styles from '../../page.module.css';

type paramsType = {
  id: string;
};

const page = async ({ params }: { params: paramsType }) => {
  console.log(`${params.id} pre rendering`);

  const { title, body } = await getPost(params.id);
  const bodyLine = body.split('\n');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.article}>
        {bodyLine.map((body, i) => (
          <p key={i}>{body}</p>
        ))}
      </div>
    </main>
  );
};
export default page;

export async function generateStaticParams(): Promise<paramsType[]> {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// generateStaticParams に含まれない動的セグメントは 404 を返す
export const dynamicParams = false;

// デフォルト設定
// generateStaticParams に含まれない動的なセグメントは、必要に応じて生成される
// export const dynamicParams = true;
