import { addComment } from '@/services/api';
import { verifyTurnstileToken } from '@/services/transtile-cloudflare/transtile-api';
import { ICommentForm } from '@/types/article';
import { CaptchaResponse } from '@/types/cloudflare-captcha';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const fd = await request.formData();
    const secret = process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY;
    const token = fd.get('token');
    const comment = fd.get('comment');
    const parsedComment = JSON.parse(comment as string);
    if (!secret) {
        return new Response(
            JSON.stringify({ message: 'Missing secret key', success: false }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if (!token) {
        return new Response(
            JSON.stringify({
                message: 'Missing captcha token',
                success: false,
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if (!comment) {
        return new Response(
            JSON.stringify({
                message: 'Missing comment form',
                success: false,
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if (typeof comment !== 'string') {
        return new Response(
            JSON.stringify({
                message:
                    'Invalid comment form format should wrap inside json stringify',
                success: false,
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const response = await verifyTurnstileToken(token as string, secret);
        if (!response.success) {
            return new Response(
                JSON.stringify({
                    message: 'Failed to verify captcha',
                    success: false,
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            const addedComment = await addComment({
                arg: parsedComment as ICommentForm,
            });

            return new Response(
                JSON.stringify({
                    message: 'Captcha verified successfully',
                    success: true,
                    data: addedComment.data,
                }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: error.message,
                success: true,
            }),
            {
                status: error.statusCode || 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
