'use client';
import { getPortfolioCategories, getPortfolioList } from '@/services/api';
import { IPortfolio } from '@/types/portfolio';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import React, { useCallback, useEffect, useState } from 'react';
import PortfolioGalleryCard from './PortfolioGalleryCard';
import PortfolioCard from './PortfolioCard';
import PortfolioVideoCard from './PortfolioVideoCard';
import Modal from './Modal';
import { GrClose } from 'react-icons/gr';
import { IStrapiImageResponse } from '@/types/common-types';
import ImageGallery from 'react-image-gallery';
import SkeletonPortfolioCard from './SkeletonPortfolioCard';
import useSWR from 'swr';
import { swrKeys } from '@/swr/keys';
import PortfolioVideoModal from './PortfolioVideoModal';
import { BsDatabaseFillX } from 'react-icons/bs';

const initialPaginationValues = {
    index: 1,
    limit: 4,
};

const useInfinitePortfolioQuery = ({
    paginationIndex,
    paginationLimit,
    selectedCategory,
}: {
    selectedCategory: string;
    paginationIndex: number;
    paginationLimit: number;
}) => {
    const [infiniteData, setInfiniteData] = useState<IPortfolio[]>([]);

    const resetInfiniteData = useCallback(() => {
        setInfiniteData([]);
    }, []);

    const {
        data: portfolioList,
        isLoading: isLoadingPortfolioList,
        error: errorPortfolioList,
    } = useSWR(
        [
            swrKeys.portfolioList,
            selectedCategory,
            paginationIndex,
            paginationLimit,
        ],
        () =>
            getPortfolioList({
                query: selectedCategory,
                limit: paginationLimit,
                offset: paginationIndex,
            }),
        {
            refreshInterval: 1800000,
            focusThrottleInterval: 1800000,
            keepPreviousData: true,
            onSuccess: (data) => {
                setInfiniteData((prev) => [...prev, ...data.data]);
            },
        }
    );

    return {
        data: {
            meta: portfolioList?.meta,
            data: infiniteData,
        },
        isLoadingPortfolioList,
        errorPortfolioList,
        resetInfiniteData,
    };
};

const PortfolioList = () => {
    const [selectedCategory, setSelectedCategory] = useState('web-design');
    const [paginationIndex, setPaginationIndex] = useState(
        initialPaginationValues.index
    );
    const [paginationLimit, setPaginationLimit] = useState(
        initialPaginationValues.limit
    );

    // const {
    //     data: portfolioList,
    //     isLoading: isLoadingPortfolioList,
    //     error: errorPortfolioList,
    // } = useSWR(
    //     [
    //         swrKeys.portfolioList,
    //         selectedCategory,
    //         paginationIndex,
    //         paginationLimit,
    //     ],
    //     () =>
    //         getPortfolioList({
    //             query: selectedCategory,
    //             limit: paginationLimit,
    //             offset: paginationIndex,
    //         }),
    //     {
    //         refreshInterval: 1800000,
    //         focusThrottleInterval: 1800000,
    //         keepPreviousData: true,
    //     }
    // );

    const {
        data,
        errorPortfolioList,
        isLoadingPortfolioList,
        resetInfiniteData,
    } = useInfinitePortfolioQuery({
        paginationIndex,
        paginationLimit,
        selectedCategory,
    });

    const {
        data: portfolioCategories,
        isLoading: isLoadingPortfolioCategory,
        error: errorPortfolioCategories,
    } = useSWR(swrKeys.portfolioCategories, getPortfolioCategories, {
        refreshInterval: 1800000,
        focusThrottleInterval: 1800000,
    });
    const randomArray = Array.from({ length: 4 }, (_, k) => {
        k + 1;
    });

    const isDisabledSeeMoreButton =
        data.meta?.pagination.pageCount === paginationIndex;
    const [isShowVideoModal, setShowVideoModal] = useState(false);
    const [isShowGalleryModal, setShowGalleryModal] = useState(false);
    const [videoData, setVideoData] = useState<IPortfolio>();
    const [galleryData, setGalleryData] = useState<IPortfolio>();

    const handleSelectCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        setSelectedCategory(target.title);
        setPaginationIndex(initialPaginationValues.index);
        setPaginationLimit(initialPaginationValues.limit);
        resetInfiniteData();
    };

    const handleOpenVideoModal = (portfolio: IPortfolio) => {
        if (!portfolio) {
            console.error('PLEASE PROVIDE A VIDEO DATA FIRST');
            return;
        }

        setShowVideoModal(true);
        setVideoData(portfolio);
    };

    const handleOpenGalleryModal = (portfolio: IPortfolio) => {
        if (!portfolio) {
            console.error('PLEASE PROVIDE A IMAGES LIST FIRST');
            return;
        }

        setShowGalleryModal(true);
        setGalleryData(portfolio);
    };

    const handleGetMorePortfolioItems = () => {
        setPaginationIndex((offset) => offset + 1);
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-16 max-md:gap-8">
            <ul dir="ltr" className="portfolio-filter">
                {!isLoadingPortfolioCategory &&
                    portfolioCategories?.data?.map((category, idx: number) => (
                        <li
                            key={category.id}
                            className={twMerge(
                                'shrink-0',
                                category.attributes.normalize ===
                                    selectedCategory &&
                                    'border-b-[3px] border-darkBlack font-bold'
                            )}
                        >
                            <button
                                type="button"
                                title={category.attributes.normalize}
                                onClick={handleSelectCategory}
                                className="text-base capitalize text-darkBlack"
                            >
                                {category.attributes.name}
                            </button>
                        </li>
                    ))}
            </ul>
            <ul className={twMerge('portfolio-list')}>
                {isLoadingPortfolioList &&
                    randomArray.map((_, index) => (
                        <SkeletonPortfolioCard key={index} />
                    ))}
                {data && data.data.length === 0 && (
                    <div
                        className="flex h-[40vh] w-full flex-col items-center justify-center gap-16 max-md:gap-8"
                        style={{ gridColumn: '1 / -1' }}
                    >
                        <BsDatabaseFillX size={75} className="text-red-600" />

                        <h2 className="text-center text-xl font-bold text-darkBlack">
                            لا يوجد اي مشاريع هنا بعد لروئيتها
                        </h2>
                    </div>
                )}
                {!isLoadingPortfolioList &&
                    data?.data?.map((portfolio) => {
                        const imagesLength =
                            portfolio.attributes.image.data?.length || 0;

                        if (portfolio.attributes.category === 'web-design') {
                            return (
                                <PortfolioCard
                                    key={portfolio.id}
                                    data={portfolio}
                                    length={imagesLength}
                                    onOpenModal={() =>
                                        handleOpenGalleryModal(portfolio)
                                    }
                                />
                            );
                        }

                        if (
                            portfolio.attributes.category ===
                                'graphic-design' ||
                            portfolio.attributes.category === 'branding'
                        ) {
                            return (
                                <PortfolioGalleryCard
                                    key={portfolio.id}
                                    data={portfolio}
                                    length={imagesLength}
                                    onOpenModal={() =>
                                        handleOpenGalleryModal(portfolio)
                                    }
                                />
                            );
                        }

                        if (portfolio.attributes.category === 'video-design') {
                            return (
                                <PortfolioVideoCard
                                    onOpenModal={() =>
                                        handleOpenVideoModal(portfolio)
                                    }
                                    key={portfolio.id}
                                    data={portfolio}
                                    length={imagesLength}
                                />
                            );
                        }
                    })}
            </ul>
            {!isDisabledSeeMoreButton && (
                <button
                    onClick={handleGetMorePortfolioItems}
                    disabled={isDisabledSeeMoreButton}
                    type="button"
                    className={twMerge('btn px-4 py-2')}
                >
                    اظهار الكل
                </button>
            )}
            {isShowVideoModal && (
                <Modal>
                    <PortfolioVideoModal
                        onClose={() => setShowVideoModal(false)}
                        src={imagePrefixURl(
                            videoData?.attributes.video.data.attributes
                                .url as string
                        )}
                        title={videoData?.attributes.title as string}
                        type={
                            videoData?.attributes.video.data.attributes
                                .mime as string
                        }
                    />
                </Modal>
            )}
            {isShowGalleryModal && (
                <Modal>
                    <GalleryModal
                        images={
                            galleryData?.attributes.image
                                .data as IStrapiImageResponse[]
                        }
                        title={galleryData?.attributes.title as string}
                        onClose={() => setShowGalleryModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default PortfolioList;

function GalleryModal({
    onClose,
    images,
    title,
}: {
    onClose: () => void;
    title: string;
    images: IStrapiImageResponse[];
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, []);

    return (
        <section
            className={twMerge(
                'fixed inset-0 z-50 flex items-center justify-center bg-stone-700 bg-opacity-50 transition-all duration-500',
                !mounted && 'scale-110 opacity-10'
            )}
        >
            <div className="flex h-fit w-full flex-col items-start justify-start gap-2 overflow-y-auto rounded-lg border border-slate-600 bg-slate-700 p-3 py-4 shadow-2xl max-md:px-3 md:w-4/5">
                <span className="flex w-full items-center justify-between py-3">
                    <button
                        onClick={onClose}
                        type="button"
                        className="bg-red-500 px-3 py-3 text-black hover:bg-red-600"
                    >
                        <GrClose className="text-xl" />
                    </button>
                    <p className="mx-auto text-2xl font-medium capitalize text-slate-100">
                        {title}
                    </p>
                </span>
                <div className="flex h-[81vh] w-full items-start justify-center overflow-y-auto rounded-lg bg-slate-800 py-4">
                    <ImageGallery
                        items={images?.map((img) => ({
                            original: imagePrefixURl(img.attributes.url),
                            thumbnail: imagePrefixURl(img.attributes.url),
                        }))}
                        additionalClass="w-full"
                    />
                </div>
            </div>
        </section>
    );
}
