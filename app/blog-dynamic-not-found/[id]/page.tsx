import { getPostsNoStore } from '../../../src/lib/getJsonPlaceholder';

import styles from '../../page.module.css';
import { Article } from './components/Article';

type paramsType = {
  id: string;
};

const page = async ({ params }: { params: paramsType }) => {
  return (
    <main className={styles.main}>
      {/* @ts-expect-error Server Component */}
      <Article id={params.id} />
    </main>
  );
};
export default page;

export async function generateStaticParams(): Promise<paramsType[]> {
  const posts = await getPostsNoStore();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// generateStaticParams に含まれない動的セグメントは 404 を返す
export const dynamicParams = false;

// デフォルト設定
// generateStaticParams に含まれない動的なセグメントは、必要に応じて生成される
// export const dynamicParams = true;
