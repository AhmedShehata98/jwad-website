import { IStrapiImageResponse } from './common-types';

export interface ISeoSocialMeta {
    socialNetwork: string;
    title: string;
    description: string;
    image: { data: IStrapiImageResponse };
}
export interface Seo {
    id: number;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    metaRobots: string;
    structuredData: any | null;
    metaViewport: string;
    canonicalURL: string;
    metaImage: {
        data: IStrapiImageResponse;
    };
    metaSocial: ISeoSocialMeta[];
}
