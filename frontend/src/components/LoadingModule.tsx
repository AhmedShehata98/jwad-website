import { getLogo } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';

async function LoadingModule() {
    const logoResponse = await getLogo();

    return (
        <div className="fixed top-0 flex h-screen w-full items-center justify-center bg-mainWhite">
            <div className="flex size-44 flex-col items-center justify-center px-6 max-md:w-10/12 max-sm:w-full">
                <Image
                    src={imagePrefixURl(
                        logoResponse.data.attributes.logo.data.attributes.url
                    )}
                    alt={
                        logoResponse.data.attributes.logo.data.attributes
                            .alternativeText
                    }
                    width={144}
                    height={144}
                />
                <span className="mt-8 inline-block size-10 animate-spin rounded-full border-[5px] border-transparent border-l-primary"></span>
            </div>
        </div>
    );
}

export default LoadingModule;
