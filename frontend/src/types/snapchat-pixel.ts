import { IPixels } from './common-types';

export interface SnapchatPixel {
    id: number;
    attributes: {
        pixel_id: string;
        user_email: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
