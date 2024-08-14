'use client';
import { getConsultantFilters } from '@/services/api';
import { swrKeys } from '@/swr/keys';
import { twMerge } from '@jakxz/tw-classnames';
import React, { useState } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

export const ABOUT_CONTENT_COOKIE_KEY = 'about-content-filter';

const AboutContentFilterWrapper = () => {
    const {
        data: marketingConsultantGoals,
        isLoading: isLoadingMarketingConsultantGoals,
    } = useSWR(swrKeys.aboutFilterList, getConsultantFilters, {
        refreshInterval: 1800000,
        focusThrottleInterval: 1800000,
    });
    const [selectedFilter, setSelectedFilter] = useState<string>(
        marketingConsultantGoals?.data.at(0)?.attributes.normalized!
    );

    const handleChooseFilter = (filter: string) => {
        setSelectedFilter(filter);

        Cookies.set(ABOUT_CONTENT_COOKIE_KEY, filter);
    };
    return (
        <ul className="grid w-fit grid-cols-3 rounded-full bg-[#EBEBEB] max-tablet:mt-8">
            {marketingConsultantGoals &&
                marketingConsultantGoals.data.map((filter, idx: number) => (
                    <li
                        key={filter.id}
                        className={twMerge(
                            'flex scale-95 items-center justify-center rounded-full px-4 py-2.5 text-lg font-semibold transition-transform',
                            selectedFilter === filter.attributes.normalized &&
                                'scale-100 bg-primary text-mainWhite'
                        )}
                    >
                        <button
                            type="button"
                            title={filter.attributes.normalized}
                            onClick={() =>
                                handleChooseFilter(filter.attributes.normalized)
                            }
                        >
                            {filter.attributes.label}
                        </button>
                    </li>
                ))}
        </ul>
    );
};

export default AboutContentFilterWrapper;
