import { endpoints } from '@/services/api';

export const swrKeys = {
    aboutSection: '/api/marketing-consultant',
    portfolioList: '/api/portfolio-lists',
    aboutFilterList: '/api/consultant-filters',
    aboutContentList: '/api/consultant-content-lists',
    portfolioCategories: '/api/portfolio-categories',
    fbPixelConfig: '/api/facebook-pixel-config',
    snapchatPixelConfig: '/api/snapchat-pixel-config',
    tiktokPixelConfig: '/api/tiktok-pixel-config',
    articleComments: endpoints.articleComments,
    addArticleComments: `${endpoints.articleComments}-add`,
    articlesList: endpoints.articles,
    articleViews: endpoints.articleViews,
};
