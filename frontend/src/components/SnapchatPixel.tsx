'use client';
import Script from 'next/script';
import { getSnapchatPixelConfig } from '@/services/api';
import useSWR from 'swr';
import { swrKeys } from '@/swr/keys';
import LoaderModule from '@/components/LoaderModule';

const SnapchatPixel = () => {
    const { data: snapchatConfig, isLoading } = useSWR(
        swrKeys.snapchatPixelConfig,
        getSnapchatPixelConfig,
        {
            focusThrottleInterval: 1800000,
            refreshInterval: 1800000,
        }
    );

    if (isLoading) {
        return null;
    }

    return (
        <>
            <Script
                id="snapchat-pixel"
                src="/scripts/snapchat-pixel.js"
                strategy="afterInteractive"
                data-pixel-id={snapchatConfig?.data.attributes.pixel_id}
                data-user-email={snapchatConfig?.data.attributes.user_email}
            />
        </>
    );
};

export default SnapchatPixel;
