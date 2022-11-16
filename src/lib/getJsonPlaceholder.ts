type postType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type postsType = postType[];

export const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await (res.json() as Promise<postsType>);
};

export const getPost = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return await (res.json() as Promise<postType>);
};
