import {
    IStrapiAdvancedLinkResponse,
    IStrapiImageResponse,
    IStrapiLinkResponse,
} from './common-types';

export interface IFooter {
    id: number;
    attributes: {
        subheading: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;

        logo: {
            data: IStrapiImageResponse;
        };

        ad: {
            id: number;
            heading: string;
            icon: { data: IStrapiImageResponse };
        };

        navigation_links: {
            id: number;
            heading: string;
            links: IStrapiLinkResponse[];
        }[];

        social_media: IStrapiAdvancedLinkResponse[];
    };
}
