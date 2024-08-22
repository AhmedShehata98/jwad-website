'use client';
import Image from 'next/image';
import React from 'react';
import {
    BlocksRenderer,
    type BlocksContent,
} from '@strapi/blocks-react-renderer';
import { IStrapiImageResponse } from '@/types/common-types';
import { imagePrefixURl } from '@/utils/image-prefix';

type Props = {
    thumbnail: { data: IStrapiImageResponse | null };
    body: BlocksContent;
};
function Content({ body, thumbnail }: Props) {
    return (
        <div className="flex w-full flex-col items-start justify-center">
            <Image
                src={imagePrefixURl(thumbnail?.data?.attributes.url as string)}
                alt="thumbnail"
                className="mb-10 !h-fit w-full rounded-md object-cover object-center shadow-lg"
                width={600}
                height={768}
            />
            <BlocksRenderer
                content={body as any}
                blocks={{
                    image: ({ image }) => {
                        return (
                            <Image
                                src={image.url}
                                width={600}
                                height={468}
                                alt={image.alternativeText || ''}
                                className="mx-auto mb-8 rounded-md object-cover object-center shadow-lg"
                            />
                        );
                    },
                }}
            />
            {/* {body} */}
        </div>
    );
}

export default Content;
