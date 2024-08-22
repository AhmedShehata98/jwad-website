'use client';

import { twMerge } from '@jakxz/tw-classnames';
import Link from 'next/link';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import React, { HTMLAttributes, useCallback } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoIosArrowRoundForward } from 'react-icons/io';

type Props = HTMLAttributes<HTMLDivElement> & {
    prevBtnTitle: string;
    nextBtnTitle: string;
    isDisabledPrevious: boolean;
    isDisabledNext: boolean;
};
function PaginationButtons({
    nextBtnTitle,
    prevBtnTitle,
    className,
    isDisabledNext,
    isDisabledPrevious,
    ...rest
}: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handlePrevPage = useCallback(() => {
        const page = searchParams.get('page');

        if (page == null || +page === 1) return;

        const newPageParam = createQueryString(
            'page',
            (parseInt(page) - 1).toString()
        );

        console.log('prev');
        router.push(`${pathname}?${newPageParam}`);
    }, [searchParams, router]);

    const handleNextPage = useCallback(() => {
        const page = searchParams.get('page');

        console.log('next');
        if (page == null) {
            const newPageParam = createQueryString('page', '1');
            router.push(`${pathname}?${newPageParam}`, { scroll: false });

            return;
        }

        const newPageParam = createQueryString(
            'page',
            (parseInt(page) + 1).toString()
        );
        router.push(`${pathname}?${newPageParam}`, { scroll: false });
    }, [searchParams, router]);

    return (
        <div
            className={twMerge(
                'mb-14 flex w-full items-center justify-between gap-6',
                className
            )}
            {...rest}
        >
            <button
                onClick={handlePrevPage}
                title="prev"
                type="button"
                disabled={isDisabledPrevious}
                className="group flex items-center justify-center gap-1 py-1.5 hover:text-neutral-600 disabled:cursor-no-drop disabled:text-neutral-500"
            >
                <IoIosArrowRoundForward
                    size={35}
                    className="group-hover:text-secondary"
                />
                <p className="text-lg font-semibold"> {prevBtnTitle}</p>
            </button>
            <button
                type="button"
                title="next"
                onClick={handleNextPage}
                disabled={isDisabledNext}
                className="group flex items-center justify-center gap-1 py-1.5 hover:text-neutral-600 disabled:cursor-no-drop disabled:text-neutral-500"
            >
                <p className="text-lg font-semibold"> {nextBtnTitle}</p>
                <IoIosArrowRoundBack
                    size={35}
                    className="group-hover:text-secondary"
                />
            </button>
        </div>
    );
}

export default PaginationButtons;
