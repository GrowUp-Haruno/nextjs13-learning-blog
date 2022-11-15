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

// デフォルト設定
// generateStaticParams に含まれない動的なセグメントは、必要に応じて生成される
// export const dynamicParams = true;
