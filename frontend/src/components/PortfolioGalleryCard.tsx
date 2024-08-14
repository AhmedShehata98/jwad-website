import { IPortfolio } from '@/types/portfolio';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import React from 'react';
import { GrFormNextLink } from 'react-icons/gr';

type Props = {
    data: IPortfolio;
    length: number;
    onOpenModal: () => void;
};
function PortfolioGalleryCard({ onOpenModal, data, length }: Props) {
    let imageWidth = 1;

    if (length >= 2) {
        imageWidth = 2;
    } else if (length >= 3) {
        imageWidth = 3;
    } else [(imageWidth = 1)];

    return (
        <li className="portfolio-gallery-card max-md:aspect-[9 / 18] group">
            <figure
                className={twMerge(
                    'grid w-full items-center justify-center gap-3 bg-inherit',
                    `grid-cols-${imageWidth}`
                )}
            >
                {data.attributes.image.data?.slice(0, 3)?.map((img, idx) => (
                    <div className="group relative overflow-hidden after:absolute after:inset-0 after:bg-darkBlack after:bg-opacity-40 after:content-['']">
                        <Image
                            key={img.id}
                            src={imagePrefixURl(img.attributes.url)}
                            alt={
                                img.attributes.alternativeText ||
                                `portfolio-${idx}.png`
                            }
                            height={600}
                            width={600}
                            className="inline-block aspect-square size-full object-cover object-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125"
                        />
                    </div>
                ))}
                <span className="absolute left-1/2 top-1/2 inline-block size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-inherit"></span>
                <h3
                    className={twMerge(
                        'm-auto flex size-24 items-center justify-center rounded-full bg-primary text-center text-3xl font-bold capitalize text-mainWhite shadow-2xl',
                        length < 4 && 'hidden'
                    )}
                >
                    {`${length - 3} +`}
                </h3>
            </figure>
            <div className="absolute bottom-0 left-0 flex h-[186px] w-full flex-col items-end justify-end gap-5 bg-gradient-to-t from-darkBlack px-3 py-4">
                <p className="text-[32px] font-bold capitalize text-mainWhite">
                    {data.attributes.title}
                </p>
                <button
                    type="button"
                    className="btn border-darkBlack bg-mainWhite px-3 py-1.5 font-medium capitalize text-darkBlack outline-mainWhite"
                    onClick={onOpenModal}
                >
                    <GrFormNextLink className="inline-block -rotate-45 text-2xl" />
                    {data.attributes.link?.[0].label}
                </button>
            </div>
        </li>
    );
}

export default PortfolioGalleryCard;
