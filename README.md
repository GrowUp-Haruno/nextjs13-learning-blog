# nextjs13-learning-blog

JSON Placeholder の post エンドポイントを用いた簡易 Blog

## 手順

### Next.js の新規プロジェクトを作成

```shell
npx create-next-app@latest --experimental-app

yarn create next-app --experimental-app

pnpm create next-app --experimental-app
```

参考文献: [Automatic Installation](https://beta.nextjs.org/docs/getting-started#automatic-installation)

### Routing 設定

#### 基本

/app ディレクトリ内の各ディレクトリに配置した page.tsx を基にページを生成します。

```tsx
const page = () => {
  return <div>page</div>;
};
export default page;
```

関数名は自由ですが、必ず`export default`する必要があります。
また、app ディレクトリ内の全てのコンポーネントはデフォルトでサーバーコンポーネントとなり、
コードの先頭に`'use client'`を指定した場合はクライアントコンポーネントとなります。
両コンポーネントはそれぞれできることが異なり、サーバーコンポーネントはフェッチや認証認可などは扱えますが、useState や useEffect、onClick、ブラウザの API などは扱えません。
クライアントコンポーネントはその逆となります。
サーバーコンポーネントは useState と useEffect を使わずに fetch を行えるように非同期関数にすることができます。

```tsx
const page = async () => {
  const fetchData = await fetchFunction();
  return <div>page</div>;
};
export default page;
```

#### 例

/app/page.tsx => http://localhost:3000/
/app/blog/page.tsx => http://localhost:3000/blog

#### 動的セグメント

フェッチしたデータを用いてルートを生成したい場合は、フォルダ名を大括弧で囲み、generateStaticParams()を定義することで動的に生成することができます。

/app/blog/[id]/page.tsx を次のように編集します。

```tsx
type paramsType = {
  id: string;
};

const page = ({ params }: { params: paramsType }) => {
  return <div>/blog/{params.id}</div>;
};
export default page;

export async function generateStaticParams(): Promise<paramsType[]> {
  return [{ id: '1' }, { id: '2' }];
}

// generateStaticParams に含まれない動的セグメントは 404 を返す
export const dynamicParams = false;
```

generateStaticParams の戻り値（{ id: '1' }と{ id: '2' }）から動的セグメントが生成され、http://localhost:3000/blog/1 と http://localhost:3000/blog/2 にアクセスが可能になります。
それ以外は 404 のページに飛びますが、`dynamicParams`を true または削除（dynamicParams のデフォルトは true のため）すると、http://localhost:3000/blog/a
などにアクセスした際に自動的に生成されるようになります。

```tsx
export const dynamicParams = false;
```

参考文献：[Routing](https://beta.nextjs.org/docs/routing/fundamentals)

### Data Fetching

JSON placeholder の`/posts`から Blog のリストとコンテンツ、動的セグメントを設定できるようにするためのデータフェッチ関数を作成します。
`/src/lib/getJsonPlaceholder.ts`を作成して、下記のコードを用意します。

```ts
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
```

`getPosts()`は全ての Blog データを取得して、Blog リストや動的セグメントの生成に使用します。
`getPost(id:string)`は記事データを取得して、各セグメントの Blog 記事の生成に使用します。

#### Blog リスト作成

`/app/blog/page.tsx`を編集します。

```tsx
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
```

データの取得は`const posts = await getPosts();`で行います。
サーバーコンポーネントは非同期でロードされるため、`async/await`が使用可能です。
また、後述する Suspense にも対応します。

React の場合は、SWR や React Query、useState + useEffect などで hook を定義しますが、Next.js 13 のサーバーコンポーネントは取得データを変数に格納するだけです。

posts は配列データのため、map 関数で Blog リストを展開します。

```tsx
{
  posts.map(({ id, title }) => (
    <Link key={id} href={`/blog/${id}`}>
      <div className={styles.card}>{title}</div>
    </Link>
  ));
}
```

`<Link></Link>`はルート間を移動するための手段となります。
Next.js 12 以前はこの内側に a タグを入れる必要がありましたが、これが不要になりました。

`/app/blog/[id]/page.tsx`で動的にルートが設定されるため、href には`/blog/${id}`を指定します。

#### 動的セグメントの設定

`/app/blog/[id]/page.tsx`を開き、generateStaticParams()を修正します。

```tsx
export async function generateStaticParams(): Promise<paramsType[]> {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
```

取得した posts を map 関数で`{id:string}`の配列を生成し、戻り値として返しています。
これにより、[id]の部分が動的に変化するようになります。

### サーバーコンポーネントの中にサーバーコンポーネントを入れる際に発生するタイプエラーの対処方法について
Reactの使用上、Promise<Element>をJSXのリターンに入れると型エラーが発生するため、下記のコメントを入れて回避する必要がある
```{/* @ts-expect-error Server Component */}```

### Next.js 13におけるSuspenseの挙動
layout.tsx内のchildrenは自動的にSuspenseでラップされており、さらにloading.tsxを用意した場合は、これをfallbackとして設定されます。

小さいコンポーネント単位で行いたい場合は、手動でSuspeseとfallbackを設定します。

### Error Boundaryについて
error.tsxを用意している場合、layout.tsx内のchildrenが自動的にErrorBoundaryでラップされ、fallbackにerror.tsxを設定されます。
このerror.tsxはクライアントコンポーネントである必要があるため、ファイルの１行目に```'use client'```を入れてクライアントコンポーネント化する必要がある。
本番環境でエラーが発生した場合、クライアントにはダイジェスト版のエラー、サーバー側にはthrowされた内容が表示されます。