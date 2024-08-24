'use client';
import { IArticleCategory } from '@/types/article';
import { twMerge } from '@jakxz/tw-classnames';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { VscDebugBreakpointData } from 'react-icons/vsc';
import { IoFilter } from 'react-icons/io5';
import { LuChevronRight } from 'react-icons/lu';

type Props = {
    categories: IArticleCategory[];
};
function Sidebar({ categories }: Props) {
    const searchParams = useSearchParams();
    const [isShownCategory, setIsShownCategory] = useState(false);
    return (
        <>
            <div
                className={twMerge(
                    'blog__sidebar__tablet blog__sidebar duration-500',
                    isShownCategory && 'max-tablet:translate-y-0'
                )}
            >
                <div className="mx-auto mb-6 flex w-full items-center justify-start gap-6 rounded-lg bg-neutral-200 px-6 py-4 lg:hidden">
                    <button
                        type="button"
                        className="rounded-lg bg-neutral-800 px-3 py-3 text-white"
                        onClick={() => setIsShownCategory((p) => !p)}
                    >
                        <LuChevronRight size={25} />
                    </button>
                    <h4 className="font-semibold">تصنيف المقالات</h4>
                </div>
                <ul className="grid w-full grid-flow-row gap-x-2 gap-y-2">
                    {categories
                        ?.sort((a, b) => a.id - b.id)
                        .map((category) => (
                            <li
                                key={category.id}
                                className="max-w-full overflow-x-hidden"
                            >
                                <Link
                                    href={{
                                        search: `category=${category.attributes.normalized_name}`,
                                    }}
                                    scroll={false}
                                    className="flex max-w-full items-center justify-start text-neutral-800"
                                    onClick={() => setIsShownCategory(false)}
                                >
                                    <span
                                        className={twMerge(
                                            'transition-all duration-500',
                                            searchParams.get('category') ===
                                                category.attributes
                                                    .normalized_name
                                                ? 'translate-x-0 opacity-100'
                                                : 'translate-x-20 opacity-0',
                                            !searchParams.get('category') &&
                                                category.attributes
                                                    .normalized_name ===
                                                    'all' &&
                                                'translate-x-0 opacity-100'
                                        )}
                                    >
                                        <VscDebugBreakpointData size={25} />
                                    </span>
                                    <p
                                        className={twMerge(
                                            'max-w-full -translate-x-3 truncate text-lg font-semibold transition-transform'
                                        )}
                                    >
                                        {category.attributes.name}
                                    </p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            <button
                onClick={() => setIsShownCategory((p) => !p)}
                type="button"
                className="fixed bottom-10 z-30 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-secondary max-tablet:left-[3.25rem] tablet:hidden"
            >
                <IoFilter size={30} />
            </button>
        </>
    );
}

export default Sidebar;
