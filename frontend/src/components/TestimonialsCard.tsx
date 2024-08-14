import { IStrapiImageResponse } from '@/types/common-types';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';
import { IoMdStar } from 'react-icons/io';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
import { twMerge } from '@jakxz/tw-classnames';

type Props = {
    data: {
        rate: number;
        review: string;
        userImage: IStrapiImageResponse;
        username: string;
        title: string;
    };
    active: boolean;
};
function TestimonialsCard({ data, active }: Props) {
    return (
        <li
            className={twMerge(
                'flex flex-col items-start justify-start gap-3 border border-[#C9CAD6] p-6 hover:bg-mainWhite hover:shadow-app-shadow',
                active && 'bg-mainWhite shadow-xl'
            )}
        >
            <span className="mb-3 flex w-1/5 items-center justify-start text-3xl text-orange-400 max-sm:w-1/3">
                <Rating value={data.rate} className="" />
            </span>

            <p className="mb-3 text-lg capitalize text-[#4F5057]">
                {data.review}
            </p>
            <div className="flex items-center justify-start gap-3">
                <Image
                    src={imagePrefixURl(data.userImage.attributes.url)}
                    alt={
                        data.userImage.attributes.alternativeText ||
                        'customer-img'
                    }
                    width={48}
                    height={48}
                />
                <span className="flex flex-col items-start justify-center">
                    <p className="text-xl font-semibold text-darkBlack">
                        {data.username}
                    </p>
                    <p className="text-lg font-normal text-[#4F5057]">
                        {data.title}
                    </p>
                </span>
            </div>
        </li>
    );
}

export default TestimonialsCard;
