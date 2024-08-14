'use client';
import {
    getConsultantContent,
    getConsultantFilters,
    getMarketingConsultant,
} from '@/services/api';
import { swrKeys } from '@/swr/keys';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

const About = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>('our-mission');
    const {
        data: marketingConsultant,
        isLoading: isLoadingMarketingConsultant,
    } = useSWR(swrKeys.aboutSection, getMarketingConsultant);
    const {
        data: marketingConsultantGoals,
        isLoading: isLoadingMarketingConsultantGoals,
    } = useSWR(swrKeys.aboutFilterList, getConsultantFilters, {
        refreshInterval: 1800000,
        focusThrottleInterval: 1800000,
    });
    const {
        data: consultantContentList,
        isLoading: isLoadingConsultantContentList,
    } = useSWR([swrKeys.aboutContentList, selectedFilter], () =>
        getConsultantContent({ query: selectedFilter })
    );

    const handleChooseFilter = useCallback((filter: string) => {
        setSelectedFilter(filter);
    }, []);

    return (
        <section
            className="app-container flex items-center justify-center max-sm:p-0"
            id={marketingConsultant?.data.attributes.section_id}
        >
            <div className="flex min-h-screen w-full flex-col items-center justify-center pt-16">
                <h4 className="mb-2 text-5xl font-bold capitalize leading-[72px] text-primary max-md:text-4xl max-sm:text-2xl">
                    {marketingConsultant?.data.attributes.heading}
                </h4>
                <p className="mb-5 mt-2 text-sm font-normal text-[#4F5057] max-sm:text-center">
                    {marketingConsultant?.data.attributes.subheading}
                </p>

                <div
                    className="relative mt-6 flex min-h-screen w-full flex-col items-center justify-between overflow-hidden rounded-3xl p-8 max-tablet:flex-col-reverse max-sm:p-4"
                    style={{
                        backgroundImage:
                            'url(/images/9009673f2117770de22b75ef227438f8.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="mt-20 flex w-full min-w-full items-center justify-between gap-7 max-tablet:flex-col-reverse max-tablet:gap-14 max-sm:flex-col">
                        <span className="flex w-1/2 flex-col items-start justify-center max-tablet:w-full">
                            <ul className="flex flex-col text-base font-medium text-[#4F5057]">
                                {isLoadingConsultantContentList && (
                                    <p
                                        key={1}
                                        className="mb-3 h-8 w-4/5 animate-pulse rounded-xl bg-gray-200 max-md:w-full"
                                    ></p>
                                )}
                                {isLoadingConsultantContentList && (
                                    <li
                                        key={2}
                                        className="mb-3 h-4 w-36 animate-pulse rounded-xl bg-gray-200 max-md:w-10/12"
                                    ></li>
                                )}
                                {isLoadingConsultantContentList && (
                                    <li
                                        key={3}
                                        className="mb-3 h-4 w-48 animate-pulse rounded-xl bg-gray-200 max-md:w-11/12"
                                    ></li>
                                )}
                                {isLoadingConsultantContentList && (
                                    <li
                                        key={4}
                                        className="mb-3 h-4 w-32 animate-pulse rounded-xl bg-gray-200 max-md:w-9/12"
                                    ></li>
                                )}
                                {consultantContentList &&
                                    consultantContentList.data.map(
                                        (content) => {
                                            const splitExtras =
                                                content.attributes.extras.split(
                                                    '/n'
                                                );
                                            return (
                                                <>
                                                    <p
                                                        key={content.id}
                                                        className="mb-3 w-2/3 text-2xl font-semibold text-primary max-md:w-full"
                                                    >
                                                        {
                                                            content.attributes
                                                                .heading
                                                        }
                                                    </p>
                                                    {splitExtras.map(
                                                        (value, idx) => (
                                                            <li key={idx}>
                                                                {value}
                                                            </li>
                                                        )
                                                    )}
                                                </>
                                            );
                                        }
                                    )}
                            </ul>
                        </span>
                        <div className="flex w-1/2 items-center justify-center max-md:w-full">
                            <div className="flex aspect-square w-[24rem] items-center justify-center rounded-full border-[3px] border-[#FFE7D6]">
                                <div className="relative aspect-square w-[23rem] rounded-full bg-[#FFE7D6] p-10 max-sm:w-full">
                                    {marketingConsultant && (
                                        <Image
                                            src={imagePrefixURl(
                                                marketingConsultant?.data
                                                    .attributes.blocks?.[0]
                                                    .image?.data.attributes.url
                                            )}
                                            alt={
                                                marketingConsultant?.data
                                                    .attributes.blocks?.[0]
                                                    .image?.data.attributes
                                                    .alternativeText
                                            }
                                            className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-b-full object-cover"
                                            width={460}
                                            height={550}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul
                        className={twMerge(
                            'grid w-fit grid-cols-3 rounded-full bg-[#EBEBEB] max-tablet:mt-8',
                            isLoadingMarketingConsultantGoals &&
                                'w-4/6 animate-pulse gap-2 bg-slate-300 max-md:w-full'
                        )}
                    >
                        {isLoadingMarketingConsultantGoals && (
                            <>
                                <li className="flex h-9 w-1/3 scale-95 animate-pulse items-center justify-center rounded-full bg-gray-300 text-lg font-semibold transition-transform"></li>
                                <li className="flex scale-95 animate-pulse items-center justify-center rounded-full bg-gray-300 px-4 py-2.5 text-lg font-semibold transition-transform"></li>
                                <li className="flex scale-95 animate-pulse items-center justify-center rounded-full bg-gray-300 px-4 py-2.5 text-lg font-semibold transition-transform"></li>
                            </>
                        )}
                        {marketingConsultantGoals &&
                            marketingConsultantGoals.data.map(
                                (filter, idx: number) => (
                                    <li
                                        key={filter.id}
                                        className={twMerge(
                                            'flex scale-95 items-center justify-center rounded-full px-4 py-2.5 text-lg font-semibold transition-transform',
                                            selectedFilter ===
                                                filter.attributes.normalized &&
                                                'scale-100 bg-primary text-mainWhite'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            title={filter.attributes.normalized}
                                            onClick={() =>
                                                handleChooseFilter(
                                                    filter.attributes.normalized
                                                )
                                            }
                                        >
                                            {filter.attributes.label}
                                        </button>
                                    </li>
                                )
                            )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default React.memo(About);
