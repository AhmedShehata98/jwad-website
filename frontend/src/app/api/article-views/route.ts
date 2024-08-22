import {
    addArticleView,
    BASE_URL,
    endpoints,
    StrapiResponse,
    updateArticleView,
} from '@/services/api';
import { getClientLocation } from '@/services/ipapi';
import { IViewForm } from '@/types/blog';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/server';
import qs from 'qs';

const ARTICLES_VIEWS_KEY = 'ARTICLES_VIEWS';

export async function POST(request: NextRequest) {
    const cookies = request.cookies;
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const articleId = searchParams.get('articleId') as string;

    try {
        const clientLocation = await getClientLocation();
        const existingViews = await _getArticleById({ articleId });

        if (existingViews.data.length >= 1) {
            // update existing view collection
            const updatedView = await _updateArticleViews({
                articleId,
                visits: existingViews.visits.concat([
                    {
                        ip_address: clientLocation.ip,
                        country: clientLocation.country,
                        city: clientLocation.city,
                        time_zone: clientLocation.timezone,
                    },
                ]),
            });
            console.log('#'.repeat(14));
            console.log('updatedView', updatedView);
            return new Response('Updated client view with this article', {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // create new view collection
            const addedView = await _addArticleViews({
                articleId,
                visits: [
                    {
                        ip_address: clientLocation.ip,
                        country: clientLocation.country,
                        city: clientLocation.city,
                        time_zone: clientLocation.timezone,
                    },
                ],
            });
            console.log('#'.repeat(14));
            console.log('addedView', addedView);
            return new Response('Added new client view with this article', {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error: any) {
        return new Response(JSON.stringify(error), {
            status: error.statusCode || 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const articleId = searchParams.get('articleId') as string;
    // try {
    //     const article = await _getArticleViews(articleId);

    //     return new Response(
    //         JSON.stringify({
    //             message: 'article views count',
    //             data: { viewsCount: article.meta.pagination.total },
    //         }),
    //         { status: 200, headers: { 'Content-Type': 'application/json' } }
    //     );
    // } catch (error) {
    //     throw error;
    // }
}

const _addArticleViews = async ({
    articleId,
    visits,
}: {
    articleId: string;
    visits: Omit<IViewForm, 'article_id' | 'guest_ip'> &
        { ip_address: string }[];
}) => {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = await fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { article: articleId, visits } }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
const _updateArticleViews = async ({
    articleId,
    visits,
}: {
    articleId: string;
    visits: Omit<IViewForm, 'article_id' | 'guest_ip'> &
        { ip_address: string }[];
}) => {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = await fetch(`${url.href}/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { article: articleId, visits } }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
const _getArticleById = async ({ articleId }: { articleId: string }) => {
    try {
        const queryBuilder = qs.stringify({
            filters: {
                article: {
                    id: {
                        $eq: articleId,
                    },
                },
            },
        });
        const url = new URL(endpoints.articleViews, BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href);
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
