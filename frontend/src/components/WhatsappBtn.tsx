import { getHeader } from '@/services/api';
import Image from 'next/image';
import React from 'react';

async function WhatsappBtn() {
    const headerItems = await getHeader();

    return (
        <a
            href={headerItems.data.attributes.cta_btn?.[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 left-6 z-30 shadow-2xl max-tablet:bottom-28 max-md:w-14"
        >
            <Image
                src={'/icons/whatsapp.png'}
                alt="whatsapp.png"
                width={64}
                height={64}
            />
        </a>
    );
}

export default WhatsappBtn;
