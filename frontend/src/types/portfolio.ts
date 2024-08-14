import {
    IStrapiImageResponse,
    IStrapiLinkResponse,
    IStrapiVideoResponse,
} from './common-types';

export interface IPortfolio {
    attributes: {
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        category: string;
        image: {
            data: IStrapiImageResponse[];
        };
        video: {
            data: IStrapiVideoResponse;
        };
        video_thumbnail: {
            data: IStrapiVideoResponse;
        };
        link: IStrapiLinkResponse[];
    };
    id: number;
}

export interface IPortfolioCategory {
    attributes: {
        name: string;
        normalize: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    id: number;
}
