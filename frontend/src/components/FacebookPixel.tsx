'use client';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import * as pixel from '@/lib/fbPixel';
import { getFacebookPixelConfig } from '@/services/api';
import useSWR from 'swr';
import { swrKeys } from '@/swr/keys';
import LoaderModule from '@/components/LoaderModule';

const FacebookPixel = () => {
    const { data: fbPixelConfig, isLoading } = useSWR(
        swrKeys.fbPixelConfig,
        getFacebookPixelConfig,
        {
            focusThrottleInterval: 1800000,
            refreshInterval: 1800000,
        }
    );
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;

        pixel.pageview();
    }, [pathname, loaded]);

    if (isLoading) {
        return null;
    }

    return (
        <div>
            <Script
                id="fb-pixel"
                src="/scripts/fb-pixels.js"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={fbPixelConfig?.data.attributes.pixel_id}
            />
        </div>
    );
};

export default FacebookPixel;
