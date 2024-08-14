export interface IStrapiImageResponse {
    id: number;
    attributes: IMediaAttribute;
}

interface IMediaAttribute {
    name: string;
    alternativeText: string;
    caption: number;
    width: number;
    height: number;
    formats: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: number;
    provider: string;
    provider_metadata: number;
    createdAt: string;
    updatedAt: string;
}
export interface IStrapiVideoResponse {
    id: number;
    attributes: IMediaAttribute;
}

export interface IStrapiLinkResponse {
    id: number;
    __component: string;
    label: string | null;
    url: string | null;
    snapchat_event: string | null;
    fb_event: string | null;
    tiktok_event: string | null;
}

export interface IStrapiAdvancedLinkResponse extends IStrapiLinkResponse {
    isExternal: boolean;
    icon: { data: IStrapiImageResponse };
}

export interface IPixels {
    id: number;
    attributes: {
        pixel_id: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
