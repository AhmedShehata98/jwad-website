import { IArticle, IArticleCard } from '@/types/article';
import { formatDate } from './date-format';

export const mapArticleToCardData = (article: IArticle): IArticleCard => {
    const mappedArticle: IArticleCard = {
        id: article.id,
        attributes: {
            createdAt: article.attributes.createdAt,
            updatedAt: article.attributes.updatedAt,
            title: article.attributes.title,
            description: article.attributes.description,
            thumbnail: article.attributes.thumbnail,
            publishedAt: formatDate('ar-SA', article.attributes.publishedAt),
            publisher: article.attributes.publisher,
        },
    };

    return mappedArticle;
};
