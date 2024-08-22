export interface CaptchaResponse {
    success: boolean;
    'error-codes': string[];
    challenge_ts: string;
    hostname: string;
    action: string;
    cdata: string;
    metadata: {
        interactive: boolean;
    };
    message: string;
}
