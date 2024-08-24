'use client';
import { useCallback, useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { getAllComments, getArticleById, getLogo } from '@/services/api';
import { formatDate } from '@/utils/date-format';
import DrowerComments from './components/DrowerComments';
import useSWR from 'swr';
import { swrKeys } from '@/swr/keys';
import LoadingModule from '@/components/LoadingModule';
import useAddArticleViewer from '@/app/hooks/useAddArticleViewer';

type Props = {
    params: { articleId: string };
    searchParams: object;
};

function Article({ params, searchParams }: Props) {
    const [commentPage, setCommentPage] = useState(1);
    const [commentLimit, setCommentLimit] = useState(20);
    const [commentRevalidate, setCommentRevalidate] = useState(false);
    const [isOpenComments, setOpenComments] = useState(false);
    const { data: logo } = useSWR('logo', () => getLogo());

    const {
        data: articleData,
        isLoading: isLoadingArticleData,
        error,
    } = useSWR([swrKeys.articlesList, params.articleId], () =>
        getArticleById(parseInt(params.articleId))
    );
    const {
        data: commentsList,
        isLoading: isLoadingComments,
        error: errorComments,
        mutate: mutateComments,
    } = useSWR(
        [[swrKeys.articleComments, commentRevalidate], commentPage],
        () =>
            getAllComments({
                page: commentPage,
                limit: commentLimit,
                articleId: parseInt(params.articleId),
            })
    );
    const { articleViews, isLoadingArticleViews } = useAddArticleViewer(
        params.articleId
    );

    const revalidateArticleComments = useCallback(() => {
        setCommentRevalidate((p) => !p);
    }, []);

    if (isLoadingArticleData) {
        return <LoadingModule logo={logo?.data.attributes.logo.data} />;
    }
    if (!articleData) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-start bg-mainWhite">
            <section className="lg:w-4xl tablet:w-3xl container mx-auto max-w-full px-6 py-8 md:max-w-xl md:px-0 xl:max-w-4xl">
                <Header
                    title={articleData.data.attributes.title}
                    articleId={params.articleId}
                    publishedAt={formatDate(
                        'ar-SA',
                        articleData.data.attributes.publishedAt as string
                    )}
                    publisher={{
                        name: articleData.data.attributes.publisher.data
                            .attributes.name,
                        avatar: articleData.data.attributes.publisher.data
                            .attributes.avatar.data,
                    }}
                    onOpenComments={() => setOpenComments(true)}
                    commentsLength={commentsList?.meta.pagination.total}
                    articleViews={articleViews}
                />
                <Content
                    thumbnail={articleData.data.attributes.thumbnail}
                    body={articleData.data.attributes.content}
                />
                <Footer
                    tags={articleData.data.attributes.tags}
                    comments={commentsList?.data}
                    articleId={params.articleId}
                    revalidateArticleComments={revalidateArticleComments}
                    commentsLength={commentsList?.meta.pagination.total}
                    articleViews={articleViews}
                />
            </section>

            {isOpenComments && (
                <DrowerComments
                    comments={commentsList?.data}
                    onClose={() => setOpenComments(false)}
                />
            )}
        </main>
    );
}

export default Article;
