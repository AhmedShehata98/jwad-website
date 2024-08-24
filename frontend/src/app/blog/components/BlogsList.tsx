import ArticleCard from './ArticleCard';
import { twMerge } from '@jakxz/tw-classnames';
import { IArticle } from '@/types/article';
import { mapArticleToCardData } from '@/utils/map-article-data';

type Props = {
    articles: IArticle[];
    isHasFilters: boolean;
    lastCreatedArticle: IArticle[];
};
function BlogsList({ articles, isHasFilters, lastCreatedArticle }: Props) {
    return (
        <section className="flex w-full flex-col items-start justify-start gap-[calc(var(--article-list-gap)/2)]">
            {!isHasFilters &&
                lastCreatedArticle?.map((article: IArticle) => {
                    return (
                        <ArticleCard
                            key={article.id}
                            dir="row"
                            fullWidth
                            className="max-md:w-full"
                            article={mapArticleToCardData(article)}
                        />
                    );
                })}

            <ul
                className={twMerge(
                    'article-list',
                    (articles?.length <= 0 || !articles) &&
                        'flex items-center justify-center',
                    isHasFilters && 'border-t-0 !pt-0'
                )}
            >
                {(articles?.length <= 0 || !articles) && (
                    <div className="my-8 w-full rounded-md bg-neutral-200 p-10 shadow target:w-3/4 max-md:text-center md:w-4/5 lg:w-1/2">
                        <h1 className="mb-4 text-xl font-bold text-orange-500">
                            لا يوجد مقالات
                        </h1>
                        <p className="text-lg font-medium capitalize text-neutral-500">
                            {' '}
                            عفوا , لا يوجد مقالات لعرضها هنا حاول مرة اخري لاحقا
                        </p>
                    </div>
                )}
                {articles?.map((article: IArticle) => {
                    return (
                        <ArticleCard
                            key={article.id}
                            dir="col"
                            className={twMerge(
                                'md:article-card__layout',
                                articles.length <= 1 &&
                                    'article-card__layout__one-card'
                            )}
                            article={mapArticleToCardData(article)}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default BlogsList;
