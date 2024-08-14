'use client';
import { getTikTokPixelConfig } from '@/services/api';
import { swrKeys } from '@/swr/keys';
import Script from 'next/script';
import useSWR from 'swr';
import LoaderModule from '@/components/LoaderModule';

function TikTokPixel() {
    const { data: tiktokPixelConfig, isLoading } = useSWR(
        swrKeys.tiktokPixelConfig,
        getTikTokPixelConfig,
        {
            focusThrottleInterval: 1800000,
            refreshInterval: 1800000,
        }
    );

    if (isLoading) return null;

    return (
        <Script
            id="tiktok-pixel"
            src="/scripts/tiktok-pixel.js"
            strategy="afterInteractive"
            data-pixel-id={tiktokPixelConfig?.data.attributes.pixel_id}
        />
    );
}

export default TikTokPixel;
