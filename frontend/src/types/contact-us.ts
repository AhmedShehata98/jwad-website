import { IStrapiImageResponse } from './common-types';

export interface ISocialMediaLink {
    id: number;
    attributes: {
        link: {
            id: number;
            __component: string;
            label: string;
            href: string;
            isExternal: boolean;
            fb_event: string;
            snapchat_event: string;
            tiktok_event: string;
            icon: {
                data: IStrapiImageResponse;
            };
        }[];
    };
}
