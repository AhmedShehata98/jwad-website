'use client';
import { createArticleView, getArticleView } from '@/services/api';
import { swrKeys } from '@/swr/keys';
import useSWR from 'swr';

function useAddArticleViewer(articleId: string): {
    articleViews: number | undefined;
    isLoadingArticleViews: boolean;
} {
    if (!articleId) {
        console.error('PLEASE PROVIDE AN ARTICLE ID');
    }
    const {
        data: articleViews,
        isLoading,
        mutate,
    } = useSWR(swrKeys.articleViews, () => getArticleView(articleId), {
        isPaused: () => !Boolean(articleId),
    });
    const { data, error } = useSWR(
        'article-view',
        () => createArticleView(articleId),
        {
            isPaused: () => !Boolean(articleId),
            onSuccess: async () => mutate(),
            focusThrottleInterval: 3_000_000,
            refreshInterval: 3_000_000,
            revalidateOnFocus: false,
        }
    );

    return {
        articleViews: articleViews?.data.viewsCount,
        isLoadingArticleViews: isLoading,
    };
}

export default useAddArticleViewer;
