import { IStrapiImageResponse } from './common-types';

export interface IAppMeta {
    id: number;
    attributes: {
        seo: {
            id: number;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            metaRobots: string;
            structuredData: string;
            metaViewport: string;
            canonicalURL: string;
            metaImage: { data: IStrapiImageResponse };
        };
        social_media_meta: {
            id: number;
            socialNetwork: string;
            title: string;
            description: string;
            image: { data: IStrapiImageResponse };
        }[];
    };
}
export interface IStructuredData {
    id: number;
    attributes: {
        seo: {
            id: number;
            structuredData: string;
        };
    };
}
