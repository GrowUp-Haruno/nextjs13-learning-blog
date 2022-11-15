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