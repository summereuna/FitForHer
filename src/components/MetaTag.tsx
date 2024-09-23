import { Helmet } from "react-helmet-async";

interface MetaTagProps {
  title: string;
  description?: string;
  url?: string;
}

const MetaTag = ({ title, description, url }: MetaTagProps) => {
  return (
    <Helmet>
      <title>{`${title} | Fit For Her`}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : `여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼`
        }
      />
      <link
        rel="canonical"
        href={`https://fit-for-her.vercel.app/${url ? url : ""}`}
      />
    </Helmet>
  );
};

export default MetaTag;
