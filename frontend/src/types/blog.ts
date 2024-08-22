import { ISeoSocialMeta, Seo } from './seo-types';

export interface IBlogPage {
    id: number;
    attributes: {
        chipText: string;
        heading: string;
        description: string;
        pagination_btn: {
            id: number;
            __component: string;
            label: string;
        }[];
    };
}
export interface IBlogSEO {
    id: number;
    attributes: {
        seo: Seo;
        meta_social: ISeoSocialMeta[];
    };
}

export interface IViewForm {
    guest_ip: string;
    country: string;
    city: string;
    time_zone: string;
    article_id: { identifier: string }[];
}
