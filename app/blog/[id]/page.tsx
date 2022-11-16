import { use } from 'react';
import { getPost, getPosts } from '../../../src/lib/getJsonPlaceholder';

type paramsType = {
  id: string;
};

const page = ({ params }: { params: paramsType }) => {
  const post = use(getPost(params.id));
  console.log(post);
  return <div>/blog/{params.id}</div>;
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
