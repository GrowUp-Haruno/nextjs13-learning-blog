import 'server-only';

export type postType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type postsType = postType[];

export const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json() as Promise<postsType>;
};

export const getPost = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json() as Promise<postType>;
};
export const getPostsNoStore = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store',
  });
  return res.json() as Promise<postsType>;
};

export const getPostNoStore = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });
  return res.json() as Promise<postType>;
};

export const getPostNoStoreError = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}a`, {
    cache: 'no-store',
  });
  if (!res.ok)
    throw new Error('getPostNoStoreErrorで通信エラーが発生しました。');
  return res.json() as Promise<postType>;
};
