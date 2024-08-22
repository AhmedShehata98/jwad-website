import { BASE_URL, blogMetadata, getArticleMetadataById } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import { Metadata } from 'next';
import React from 'react';

export const generateMetadata = async ({
    params,
}: {
    params: { articleId: string };
}): Promise<Metadata> => {
    const metadata = await blogMetadata();
    const articleMetadata = await getArticleMetadataById(
        parseInt(params.articleId)
    );
    const { seo } = metadata.data.attributes;

    const metaIcons =
        seo.metaImage && Array.isArray(seo.metaImage)
            ? seo.metaImage.map((ico) =>
                  imagePrefixURl(ico?.data.attributes.url)
              )
            : imagePrefixURl(seo.metaImage?.data.attributes.url);

    return {
        title: articleMetadata.data.attributes.title,
        description: articleMetadata.data.attributes.description,
        icons: metaIcons,
        openGraph: {
            type: 'article',
            title: articleMetadata.data.attributes.title,
            description: articleMetadata.data.attributes.description,
            url: `${BASE_URL}${params.articleId}`,
            images: imagePrefixURl(
                articleMetadata.data.attributes.thumbnail.data?.attributes
                    .url as string
            ),
        },
        twitter: {
            card: 'summary_large_image',
            title: articleMetadata.data.attributes.title,
            description: articleMetadata.data.attributes.description,
            site: `${BASE_URL}${params.articleId}`,
            images: imagePrefixURl(
                articleMetadata.data.attributes.thumbnail.data?.attributes
                    .url as string
            ),
        },
    };
};

function ArticleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export default ArticleLayout;
