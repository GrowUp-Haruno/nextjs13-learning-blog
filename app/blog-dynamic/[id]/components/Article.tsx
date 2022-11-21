import {
  getPostNoStore,
} from '../../../../src/lib/getJsonPlaceholder';
import styles from '../../../page.module.css';

export const Article = async ({ id }: { id: string }) => {
  const { title, body } = await getPostNoStore(id);
  const bodys = body.split('\n');
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.article}>
        {bodys.map((body, i) => (
          <p key={i}>{body}</p>
        ))}
      </div>
    </>
  );
};
