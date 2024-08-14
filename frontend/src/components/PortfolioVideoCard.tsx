import { IPortfolio } from '@/types/portfolio';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import React, { useRef } from 'react';
import { GrFormNextLink } from 'react-icons/gr';
import { IoPlay, IoPlayCircle } from 'react-icons/io5';

type Props = {
    data: IPortfolio;
    length: number;
    onOpenModal: () => void;
};

function PortfolioVideoCard({ onOpenModal, data, length }: Props) {
    const isValidGIF = Boolean(data.attributes?.video_thumbnail.data);
    const portfolioVideoRef = useRef<null | HTMLVideoElement>(null);
    let videoWidth = 1;
    if (length >= 2) {
        videoWidth = 2;
    } else if (length >= 3) {
        videoWidth = 3;
    } else [(videoWidth = 1)];

    const handlePlayVideo = async () => {
        if (!portfolioVideoRef.current) return;
        try {
            await portfolioVideoRef.current.play();
        } catch (error) {
            console.error(error);
        }
    };
    const handlePauseVideo = async () => {
        if (!portfolioVideoRef.current) return;

        try {
            await portfolioVideoRef.current.pause();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <li className="portfolio-video-card max-md:aspect-[9 / 18] group">
            <div
                className={twMerge(
                    'grid w-full items-center justify-center gap-3',
                    `grid-cols-${videoWidth}`,
                    !isValidGIF && 'p-28'
                )}
                onMouseOver={handlePlayVideo}
                onMouseOut={handlePauseVideo}
            >
                <Image
                    className="inline-block aspect-square size-full object-cover object-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
                    src={
                        isValidGIF
                            ? imagePrefixURl(
                                  data.attributes?.video_thumbnail?.data
                                      ?.attributes.url
                              )
                            : '/icons/no-photo.png'
                    }
                    alt={
                        data.attributes?.video_thumbnail?.data?.attributes
                            .alternativeText
                    }
                    height={600}
                    width={600}
                />

                <span className="absolute inset-0 bg-darkBlack bg-opacity-30"></span>
            </div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] text-mainWhite">
                <IoPlayCircle />
            </span>
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

export default PortfolioVideoCard;
