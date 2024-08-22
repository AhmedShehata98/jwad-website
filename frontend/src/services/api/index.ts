import { IAboutContent, IAboutFilter } from '@/types/about';
import { IAppMeta, IStructuredData } from '@/types/app-meta';
import {
    IArticle,
    IArticleCategory,
    IComment,
    ICommentForm,
} from '@/types/article';
import { IBlogPage, IBlogSEO, IViewForm } from '@/types/blog';
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

export const endpoints = {
    blogPage: '/api/blog',
    articles: '/api/articles',
    articleCategories: '/api/article-categories',
    blogViews: '/api/blog-views',
    blogMetadata: '/api/blog-meta',
    articleViews: '/api/article-views',
    articleComments: '/api/article-comments',
    nextApi: {
        createArticleComment: '/api/article-comment-route',
    },
};
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

export async function getBlogPage(): Promise<StrapiResponse<IBlogPage>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                pagination_btn: {
                    standard_button: '*',
                },
            },
        });
        const url = new URL(endpoints.blogPage, BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href);

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function blogMetadata(): Promise<StrapiResponse<IBlogSEO>> {
    try {
        const url = new URL(endpoints.blogMetadata, BASE_URL);
        const queryBuilder = qs.stringify({
            populate: {
                seo: {
                    metaImage: {
                        fields: '*',
                    },
                },
                metaSocial: {
                    image: {
                        fields: '*',
                    },
                },
            },
        });
        url.search = queryBuilder;

        const res = await fetch(url.href, {
            next: { revalidate: 1800, tags: [endpoints.blogMetadata] },
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getArticleCategories(): Promise<
    StrapiResponse<IArticleCategory[]>
> {
    try {
        const url = new URL(endpoints.articleCategories, BASE_URL);

        const res = await fetch(url.href);

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getArticles({
    category,
    limit = 4,
    tags,
    page = 1,
}: {
    category: string | null;
    tags: string | null;
    limit: number;
    page: number;
}): Promise<StrapiResponse<IArticle[]>> {
    try {
        const queryBuilderWithCategoryFilter = qs.stringify({
            populate: {
                tags: {
                    populate: true,
                },
                publisher: {
                    populate: {
                        avatar: { fields: ['url', 'alternativeText'] },
                    },
                },
                article_category: {
                    populate: true,
                },
                thumbnail: {
                    fields: ['url', 'alternativeText'],
                },
            },
            filters: {
                article_category: {
                    normalized_name: {
                        $eq: category,
                    },
                },
            },
        });
        const queryBuilderWithTagsFilter = qs.stringify({
            populate: {
                tags: {
                    populate: true,
                },
                publisher: {
                    populate: {
                        avatar: { fields: ['url', 'alternativeText'] },
                    },
                },
                article_category: {
                    populate: true,
                },
                thumbnail: {
                    fields: ['url', 'alternativeText'],
                },
            },
            filters: {
                tags: {
                    normalized: {
                        $contains: tags,
                    },
                },
            },
        });

        const queryBuilder = qs.stringify({
            populate: {
                tags: {
                    populate: true,
                },
                publisher: {
                    populate: {
                        avatar: { fields: ['url', 'alternativeText'] },
                    },
                },
                article_category: {
                    populate: true,
                },
                thumbnail: {
                    fields: ['url', 'alternativeText'],
                },
            },
            pagination: {
                page,
                pageSize: limit,
            },
        });
        const url = new URL(endpoints.articles, BASE_URL);

        if (category === 'all') {
            url.search = queryBuilder;
        } else if (tags) {
            url.search = queryBuilderWithTagsFilter;
        } else if (category) {
            url.search = queryBuilderWithCategoryFilter;
        } else {
            url.search = queryBuilder;
        }

        const res = await fetch(url.href);

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getLastCreatedArticle(): Promise<
    StrapiResponse<IArticle[]>
> {
    try {
        const queryBuilder = qs.stringify({
            sort: 'createdAt:desc',
            populate: {
                publisher: {
                    populate: {
                        avatar: { fields: ['url', 'alternativeText'] },
                    },
                },
                article_category: {
                    populate: true,
                },
                thumbnail: {
                    fields: ['url', 'alternativeText'],
                },
            },
            fields: [
                'title',
                'description',
                'publishedAt',
                'createdAt',
                'updatedAt',
            ],
            pagination: {
                page: 1,
                pageSize: 1,
            },
        });
        const url = new URL(endpoints.articles, BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export async function getArticleById(
    id: number
): Promise<StrapiResponse<IArticle>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                tags: {
                    populate: true,
                },
                publisher: {
                    populate: {
                        avatar: { fields: ['url', 'alternativeText'] },
                    },
                },
                article_category: {
                    populate: true,
                },
                thumbnail: {
                    fields: ['url', 'alternativeText'],
                },
            },
        });
        const url = new URL(`${endpoints.articles}/${id}`, BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href);

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getArticleMetadataById(
    id: number
): Promise<StrapiResponse<IArticle>> {
    try {
        const queryBuilder = qs.stringify({
            fields: ['title', 'description'],
            populate: {
                thumbnail: {
                    fields: '*',
                },
            },
        });
        const url = new URL(`${endpoints.articles}/${id}`, BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href);

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function addBlogView(viewForm: Omit<IViewForm, 'article_id'>) {
    try {
        const url = new URL(endpoints.blogViews, BASE_URL);
        const res = fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: viewForm }),
        });
        const data = (await res).json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getBlogViewByIP(ip: string) {
    try {
        const queryBuilder = qs.stringify({
            filters: {
                guest_ip: {
                    $eq: ip,
                },
            },
        });
        const url = new URL(endpoints.blogViews, BASE_URL);
        url.search = queryBuilder;

        const res = fetch(url.href);
        const data = (await res).json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function addArticleView(
    viewForm: IViewForm & { article_id: { identifier: string }[] }
) {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: viewForm }),
        });
        const data = (await res).json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function updateArticleView(
    viewForm: IViewForm & { article_id: { identifier: string }[] }
) {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = fetch(url.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: viewForm }),
        });
        const data = (await res).json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getAllComments({
    limit = 6,
    page = 1,
    articleId,
}: {
    page: number;
    limit: number;
    articleId: number;
}): Promise<StrapiResponse<IComment[]>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                replay: true,
                author: {
                    populate: {
                        comment: true,
                    },
                },
            },
            pagination: {
                page,
                pageSize: limit,
            },
            filters: {
                article_id: {
                    $eq: articleId,
                },
                approvalStatus: {
                    $eq: 'APPROVED',
                },
                blockedThread: {
                    $eq: false,
                },
            },
        });
        const url = new URL(endpoints.articleComments, BASE_URL);
        url.search = queryBuilder;

        const res = await fetch(url.href, {
            next: { tags: [endpoints.articleComments] },
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function addComment(comment: {
    arg: ICommentForm;
}): Promise<StrapiResponse<IComment>> {
    try {
        const queryBuilder = qs.stringify({
            populate: {
                replay: '*',
                author: '*',
            },
        });
        const url = new URL(endpoints.articleComments, BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: comment.arg }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function createComment(commentForm: FormData) {
    try {
        const url = new URL(
            endpoints.nextApi.createArticleComment,
            window.location.origin
        );
        const response = await fetch(url.href, {
            method: 'POST',
            body: commentForm,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function createArticleView(
    articleId: string
): Promise<{ message: string; data: object }> {
    try {
        const queryBuilder = qs.stringify({
            articleId,
        });
        const url = new URL('/api/article-views', window.location.origin);
        url.search = queryBuilder;

        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
export async function getArticleView(
    articleId: string
): Promise<{ message: string; data: { viewsCount: number } }> {
    try {
        const queryBuilder = qs.stringify({
            articleId,
        });
        const url = new URL('/api/article-views', window.location.origin);
        url.search = queryBuilder;

        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}
