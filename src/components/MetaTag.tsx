import { Helmet } from "react-helmet-async";
import f4h from "@/assets/images/f4h_twitter_img.png";

interface MetaTagProps {
  title: string;
  description?: string;
  keywords?: string;
  imgSrc?: string;
  url?: string;
}

const MetaTag = ({
  title,
  description,
  keywords,
  imgSrc,
  url,
}: MetaTagProps) => {
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
      <meta
        name="keywords"
        content={
          keywords
            ? keywords
            : `F4H, 핏포허, fit for her, 여자 스포츠웨어, 러닝 쇼츠, 필라테스 옷, 요가 옷, 헬스 옷`
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Fit For Her`} />
      <meta property="og:site_name" content="Fit For Her" />
      <meta
        property="og:description"
        content={
          description
            ? description
            : `여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼`
        }
      />
      <meta property="og:image" content={imgSrc ? imgSrc : f4h} />
      <meta
        property="og:url"
        content={`https://fit-for-her.vercel.app/${url}`}
      />

      <meta name="twitter:title" content={`${title} | Fit For Her`} />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : `여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼`
        }
      />
      <meta name="twitter:image" content={imgSrc ? imgSrc : f4h} />

      <link rel="canonical" href={`https://fit-for-her.vercel.app/${url}`} />
    </Helmet>
  );
};

export default MetaTag;
