import { BASE_URL, endpoints, StrapiResponse } from '@/services/api';
import { getClientLocation } from '@/services/ipapi';
import { IArticleViewForm } from '@/types/blog';
import { NextRequest } from 'next/server';
import qs from 'qs';

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const articleId = searchParams.get('articleId') as string;

    try {
        const clientLocation = await getClientLocation();
        const existingViews = await _getArticleById({ articleId });

        if (existingViews.data.length >= 1) {
            // update existing view collection
            const isExistsUser =
                existingViews.data[0].attributes.visits.findIndex(
                    (u: any) => u.ip_address === clientLocation.ip
                );

            if (isExistsUser) {
                return new Response('this user is already view this article', {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            // update collection and add user to article visits
            await _updateArticleViews(articleId, {
                article: articleId,
                visits: [
                    ...existingViews.data[0].attributes.visits,
                    {
                        ip_address: clientLocation.ip,
                        country: clientLocation.country,
                        city: clientLocation.city,
                        time_zone: clientLocation.timezone,
                    },
                ],
            });

            return new Response('Updated client view with this article', {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // create new view collection
            await _addArticleViews({
                article: articleId,
                visits: [
                    {
                        ip_address: clientLocation.ip,
                        country: clientLocation.country,
                        city: clientLocation.city,
                        time_zone: clientLocation.timezone,
                    },
                ],
            });

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
    try {
        const article = await _getArticleById({ articleId });

        return new Response(
            JSON.stringify({
                message: 'article views count',
                data: { viewsCount: article.data[0].attributes.visits.length },
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        throw error;
    }
}

const _addArticleViews = async (visit: IArticleViewForm) => {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = await fetch(url.href, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: visit }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
const _updateArticleViews = async (
    articleId: string,
    visit: IArticleViewForm
) => {
    try {
        const url = new URL(endpoints.articleViews, BASE_URL);
        const res = await fetch(`${url.href}/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: visit }),
        });
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
const _getArticleById = async ({
    articleId,
}: {
    articleId: string;
}): Promise<StrapiResponse<{ id: number; attributes: IArticleViewForm }[]>> => {
    try {
        const queryBuilder = qs.stringify({
            filters: {
                article: {
                    id: {
                        $eq: articleId,
                    },
                },
            },
            populate: {
                visits: true,
            },
        });
        const url = new URL(endpoints.articleViews, BASE_URL);
        url.search = queryBuilder;
        const res = await fetch(url.href);
        const data = await res.json();
        console.log(url.href);
        return data;
    } catch (error) {
        throw error;
    }
};
