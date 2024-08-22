import {
    IRichText,
    IStrapiImageResponse,
    IStrapiLinkResponse,
} from './common-types';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface IArticleCard {
    id: number;
    attributes: {
        title: string;
        description: string;
        thumbnail: {
            data: IStrapiImageResponse | null;
        };
        publisher: { data: IPublisher };
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface IArticleCategory {
    id: number;
    attributes: {
        name: string;
        normalized_name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
export interface IPublisher {
    id: number;
    attributes: {
        name: string;
        avatar: { data: Array<IStrapiImageResponse> | null };
    };
}
export interface IArticle {
    id: number;
    attributes: {
        title: string;
        content: BlocksContent;
        thumbnail: { data: IStrapiImageResponse | null };
        tags: IStrapiLinkResponse[];
        article_category: { data: IArticleCategory };
        publisher: { data: IPublisher };
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

interface Author {
    author_id: string;
    full_name: string;
    phone: string;
    email: string;
}

export interface IComment {
    id: number;
    attributes: {
        message: string;
        blockedThread: boolean;
        approvalStatus: 'APPROVED' | 'REJECTED' | 'PENDING';
        article_id: string;
        replay: Omit<IComment, 'replay|article_id'>[];
        author: Author;
        thread_of: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
export interface ICommentForm {
    message: string;
    blockedThread: boolean;
    approvalStatus: 'APPROVED' | 'REJECTED' | 'PENDING';
    article_id: string;
    thread_of: string;
    author: Author;
}
