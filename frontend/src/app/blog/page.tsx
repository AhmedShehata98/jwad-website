import { Metadata } from 'next';
import Header from './components/Header';
import PaginationButtons from './components/PaginationButtons';
import Sidebar from './components/Sidebar';
import BlogsList from './components/BlogsList';
import {
    blogMetadata,
    getArticleCategories,
    getArticles,
    getBlogPage,
    getLastCreatedArticle,
} from '@/services/api';
import { twMerge } from '@jakxz/tw-classnames';
import useAddBlogViewr from '../hooks/useAddBlogViewr';
import { mapSeoToMetadata } from '@/utils/map-seo-data';

export const revalidate = 1800;

type Props = {
    params: any;
    searchParams: {
        category: string;
        page: string;
        limit: string;
        tag: string;
    };
};

export async function generateViewport() {
    const metadata = await blogMetadata();
    const { metaViewport } = metadata.data.attributes.seo;

    return {
        viewport: metaViewport,
    };
}
export async function generateMetadata(): Promise<Metadata> {
    const metadata = await blogMetadata();
    const { seo, meta_social } = metadata.data.attributes;

    return mapSeoToMetadata({ ...seo, metaSocial: meta_social });
}

async function Blog(props: Props) {
    const [blogPage, articleCategories, lastCreatedArticle] = await Promise.all(
        [getBlogPage(), getArticleCategories(), getLastCreatedArticle()]
    );
    const articles = await getArticles({
        category: props.searchParams.category,
        tags: props.searchParams.tag,
        limit: parseInt(props.searchParams.limit || '4'),
        page: parseInt(props.searchParams.page || '1'),
    });
    useAddBlogViewr();

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-start">
            <Header
                heading={blogPage.data.attributes.heading}
                chipText={blogPage.data.attributes.chipText}
                description={blogPage.data.attributes.description}
            />
            <section className="app-container mb-5 flex items-start justify-between gap-8">
                <Sidebar categories={articleCategories.data} />
                <div className="flex w-full flex-col items-start justify-start gap-6">
                    <BlogsList
                        articles={articles.data}
                        lastCreatedArticle={lastCreatedArticle.data}
                    />
                    <PaginationButtons
                        className={twMerge(
                            'border-neutral-800',
                            articles.data &&
                                articles.data.length <= 1 &&
                                'border-t-2 pt-4',
                            'max-md:border-t-2 max-md:pt-4'
                        )}
                        isDisabledPrevious={
                            articles.meta?.pagination?.page <= 1
                        }
                        isDisabledNext={
                            articles.meta?.pagination?.page >=
                            articles.meta?.pagination?.pageCount
                        }
                        prevBtnTitle={
                            blogPage.data.attributes.pagination_btn[0].label
                        }
                        nextBtnTitle={
                            blogPage.data.attributes.pagination_btn[1].label
                        }
                    />
                </div>
            </section>
        </main>
    );
}

export default Blog;
