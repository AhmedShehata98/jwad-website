import { IAboutContent, IAboutFilter } from '@/types/about';
import { IAppMeta, IStructuredData } from '@/types/app-meta';
import { IPixels } from '@/types/common-types';
import { IFooter } from '@/types/footer';
import { IPortfolio, IPortfolioCategory } from '@/types/portfolio';
import { SnapchatPixel } from '@/types/snapchat-pixel';
import qs from 'qs';

const productionBaseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL}`;
const devBaseUrl = `${process.env.NEXT_PUBLIC_BASE_URL_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_BASE_URL_PORT}`;
const environment = process.env.NODE_ENV;

export const BASE_URL =
    environment === 'development' ? devBaseUrl : productionBaseUrl;

export type NavLink = {
    id: number;
    attributes: {
        navlink: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        href: string;
    };
};

export type StrapiResponse<T> = {
    data: T;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export async function getFacebookPixelConfig(): Promise<
    StrapiResponse<IPixels>
> {
    try {
        const url = new URL('/api/facebook-pixel-config', BASE_URL);
        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function getSnapchatPixelConfig(): Promise<
    StrapiResponse<SnapchatPixel>
> {
    try {
        const url = new URL('/api/snapchat-pixel-config', BASE_URL);
        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function getTikTokPixelConfig(): Promise<StrapiResponse<IPixels>> {
    try {
        const url = new URL('/api/tiktok-pixel-config', BASE_URL);
        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function getMetadata(): Promise<StrapiResponse<IAppMeta>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                seo: {
                    populate: {
                        metaImage: {
                            fields: ['url', 'alternativeText', 'mime'],
                        },
                    },
                },
                social_media_meta: {
                    populate: {
                        image: {
                            fields: [
                                'url',
                                'alternativeText',
                                'mime',
                                'width',
                                'height',
                            ],
                        },
                    },
                },
            },
        });
        const url = new URL('/api/app-meta', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getMetaStructuredData(): Promise<
    StrapiResponse<IStructuredData>
> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                seo: {
                    fields: ['structuredData'],
                },
            },
        });
        const url = new URL('/api/app-meta', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getUpperBarSocial() {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                icon: {
                    fields: ['url', 'alternativeText'],
                },
            },
        });
        const url = new URL('/api/upperbar-socials', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getUpperBar() {
    try {
        const url = new URL('/api/upperbar', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getHeader() {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                logo: {
                    fields: ['url', 'alternativeText'],
                },
                cta_btn: {
                    populate: {
                        icon: {
                            fields: ['url', 'alternativeText'],
                        },
                    },
                },
            },
        });
        const url = new URL('/api/header', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getAllNavLinks(): Promise<StrapiResponse<NavLink[]>> {
    try {
        const res = await fetch(`${BASE_URL}/api/headerbars`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getHeroItems(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                image: { fields: ['url', 'alternativeText'] },
                our_team_image: { fields: ['url', 'alternativeText'] },
                sales_image: { fields: ['url', 'alternativeText'] },
                heading_pattern_image: { fields: ['url', 'alternativeText'] },
                video: { fields: ['url', 'alternativeText', 'mime'] },
                discovery_link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });

        const url = new URL('/api/hero-section', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getAllHeroStatistics(): Promise<StrapiResponse<any>> {
    try {
        const res = await fetch(new URL('/api/hero-statistics', BASE_URL), {
            next: { revalidate: 1800 },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getAllMarketingServices(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                icon: { fields: ['url', 'alternativeText'] },
            },
        });
        const url = new URL('/api/hero-services', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getMarketingService(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/hero-marketing-service', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getYourDreamProject(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                image: { fields: ['url', 'alternativeText'] },
                pattern_image: { fields: ['url', 'alternativeText'] },
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/your-dream-project', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getPortfolio(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                button: {
                    populate: {
                        button: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/portfolio', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getPortfolioList({
    query = 'web-design',
    limit = 4,
    offset = 0,
}: {
    query: string;
    offset: number;
    limit: number;
}): Promise<StrapiResponse<IPortfolio[]>> {
    try {
        const pagination = { page: offset, pageSize: limit };
        const queryBuilderWithOutFIlter = qs.stringify({
            populate: {
                image: { fields: ['url', 'alternativeText'] },
                video: { fields: ['url', 'alternativeText', 'mime'] },
                video_thumbnail: { fields: ['url', 'alternativeText'] },
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
            pagination,
        });
        const queryBuilder = qs.stringify({
            populate: {
                image: { fields: ['url', 'alternativeText'] },
                video_thumbnail: { fields: ['url', 'alternativeText'] },
                video: { fields: ['url', 'alternativeText', 'mime'] },
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
            filters: {
                category: {
                    $eq: query,
                },
            },
            pagination,
        });
        const url = new URL('/api/portfolio-lists', BASE_URL);
        url.search =
            query === 'all' || query === undefined
                ? queryBuilderWithOutFIlter
                : queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getPortfolioCategories(): Promise<
    StrapiResponse<IPortfolioCategory[]>
> {
    try {
        const url = new URL('/api/portfolio-categories', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getPartners(): Promise<StrapiResponse<any>> {
    try {
        const url = new URL('/api/partner', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getPartnersList(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                image: { fields: ['url', 'alternativeText'] },
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/partners-lists', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getMarketingConsultant(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                blocks: {
                    populate: {
                        image: { fields: ['url', 'alternativeText'] },
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/marketing-consultant', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getConsultantFilters(): Promise<
    StrapiResponse<IAboutFilter[]>
> {
    try {
        const url = new URL('/api/consultant-filters', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getConsultantContent({
    query = 'our-mission',
}: {
    query: string;
}): Promise<StrapiResponse<IAboutContent[]>> {
    const queryBuilder = qs.stringify({
        populate: {
            consultant_filter: {
                populate: true,
            },
        },
        filters: {
            consultant_filter: {
                normalized: {
                    $eq: query,
                },
            },
        },
    });
    try {
        const url = new URL('/api/consultant-content-lists', BASE_URL);

        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getMarketingConsultantGoals(): Promise<
    StrapiResponse<any>
> {
    try {
        const url = new URL('/api/marketing-consultant-goals', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getTestimonial(): Promise<StrapiResponse<any>> {
    try {
        const url = new URL('/api/testimonial-section', BASE_URL);

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getAllTestimonials(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                userImage: { fields: ['url', 'alternativeText'] },
                link: {
                    populate: {
                        link: {
                            populate: true,
                        },
                    },
                },
            },
        });
        const url = new URL('/api/testimonials', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getFrequentlyQuestion(): Promise<StrapiResponse<any>> {
    try {
        const url = new URL('/api/frequently-question', BASE_URL);
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getAllFrequentlyQuestion(): Promise<StrapiResponse<any>> {
    try {
        const url = new URL('/api/frequently-question-lists', BASE_URL);
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getLogo(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                logo: { fields: ['url', 'alternativeText'] },
            },
        });
        const url = new URL('/api/logo', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getContactUs(): Promise<StrapiResponse<any>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                contact_form: {
                    populate: {
                        contact_form: {
                            populate: true,
                        },
                    },
                },
                send: {
                    populate: {
                        send: {
                            populate: true,
                        },
                    },
                },
                contact_list: {
                    populate: true,
                },
                social_media: {
                    populate: {
                        icon: { fields: ['url', 'alternativeText'] },
                    },
                },
            },
        });
        const url = new URL('/api/contact-us', BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getFooter(): Promise<StrapiResponse<IFooter>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                logo: {
                    fields: ['url', 'alternativeText'],
                },
                ad: {
                    populate: {
                        icon: {
                            fields: ['url', 'alternativeText'],
                        },
                    },
                },
                navigation_links: {
                    populate: {
                        links: '*',
                    },
                },
                social_media: {
                    populate: {
                        icon: { fields: ['url', 'alternativeText'] },
                    },
                },
            },
        });
        const url = new URL('/api/footer', BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, { next: { revalidate: 1800 } });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
