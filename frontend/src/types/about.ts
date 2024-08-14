export interface IAboutFilter {
    id: number;
    attributes: {
        label: string;
        normalized: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface IAboutContent {
    id: number;
    attributes: {
        heading: string;
        extras: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
