import { Seo } from '@/types/seo-types';
import { Metadata } from 'next';
import { imagePrefixURl } from './image-prefix';

export const mapSeoToMetadata = (seo: Seo): Metadata => {
    const facebook = seo.metaSocial?.find(
        (meta) => meta.title === 'Facebook' || meta.title === 'facebook'
    );
    const twitter = seo.metaSocial?.find(
        (meta) =>
            meta.title === 'twitter' ||
            meta.title === 'twitter' ||
            meta.title === 'x'
    );

    const metaIcons =
        seo.metaImage && Array.isArray(seo.metaImage)
            ? seo.metaImage.map((ico) =>
                  imagePrefixURl(ico?.data.attributes.url)
              )
            : imagePrefixURl(seo.metaImage?.data.attributes.url);
    let metadata = {
        title: seo.metaTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        robots: seo.metaRobots,
        alternates: {
            canonical: seo.canonicalURL,
        },
        icons: metaIcons,
        openGraph: {
            title: facebook?.title,
            description: facebook?.description,
            images: {
                url: imagePrefixURl(facebook?.image.data.attributes.url!),
                width: facebook?.image.data.attributes.width,
                height: facebook?.image.data.attributes.height,
                type: facebook?.image.data.attributes.mime,
                alt: facebook?.image.data.attributes.alternativeText,
            },
        },
        twitter: {
            title: twitter?.title,
            description: twitter?.description,
            images: {
                url: imagePrefixURl(twitter?.image.data.attributes.url!),
                width: twitter?.image.data.attributes.width,
                height: twitter?.image.data.attributes.height,
                type: twitter?.image.data.attributes.mime,
                alt: twitter?.image.data.attributes.alternativeText,
            },
        },
    };

    return metadata;
};
