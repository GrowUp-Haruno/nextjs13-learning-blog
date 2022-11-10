export const generateStaticParams = async () => {
  return [{ id: '1' }, { id: '2' }];
};

const page = ({ params }: { params: { id: string } }) => {
  return <div>/blog/{params.id}</div>;
};
export default page;
