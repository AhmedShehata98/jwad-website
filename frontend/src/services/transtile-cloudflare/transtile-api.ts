import { CaptchaResponse } from '@/types/cloudflare-captcha';

export async function verifyTurnstileToken(
    token: string,
    secret: string
): Promise<CaptchaResponse> {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    try {
        const formDate = new FormData();
        formDate.append('secret', secret);
        formDate.append('response', token);
        const res = await fetch(url, {
            method: 'POST',
            body: formDate,
        });

        const outcome = await res.json();
        return outcome;
    } catch (error) {
        throw error;
    }
}
