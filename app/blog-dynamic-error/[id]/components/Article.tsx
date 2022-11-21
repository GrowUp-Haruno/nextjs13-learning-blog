import { getPostNoStoreError } from '../../../../src/lib/getJsonPlaceholder';
import styles from '../../../page.module.css';

export const Article = async ({ id }: { id: string }) => {
  const post = await getPostNoStoreError(id);

  const bodys = post.body.split('\n');
  return (
    <>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.article}>
        {bodys.map((body, i) => (
          <p key={i}>{body}</p>
        ))}
      </div>
    </>
  );
};
