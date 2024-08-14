import { getMetaStructuredData } from '@/services/api';
import Script from 'next/script';
import React from 'react';

const StructuredDataMetadata = async () => {
    const structuredData = await getMetaStructuredData();

    if (!structuredData.data) return null;

    const { seo } = structuredData.data.attributes;

    return (
        <Script
            type="application/ld+json"
            async
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(seo.structuredData),
            }}
        />
    );
};

export default StructuredDataMetadata;
