import { IStrapiImageResponse } from '@/types/common-types';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';

type Props = {
    data: {
        icon: IStrapiImageResponse;
        heading: string;
        description: string;
    };
};
function OfferCard({ data }: Props) {
    return (
        <li className="group flex flex-col items-center justify-center gap-3 rounded-xl bg-mainWhite p-6 hover:shadow-app-shadow">
            <span className="rounded-lg p-2 group-hover:bg-[#f08eab]">
                <Image
                    src={imagePrefixURl(data.icon.attributes.url)}
                    width={48}
                    height={48}
                    alt={data.icon.attributes.alternativeText || 'icon.png'}
                />
            </span>
            <p className="font-semibold text-darkBlack">{data.heading}</p>
            <p className="text-sm font-normal text-[#4F5057]">
                {data.description}
            </p>
        </li>
    );
}

export default OfferCard;
