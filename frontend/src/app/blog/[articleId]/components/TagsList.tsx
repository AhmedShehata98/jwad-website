import { IStrapiLinkResponse } from '@/types/common-types';
import Link from 'next/link';
import React from 'react';

type Props = {
    tags: IStrapiLinkResponse[];
};
function TagsList({ tags }: Props) {
    return (
        <div>
            <h4 className="mb-3 mt-6 text-lg font-semibold capitalize">
                العلامات
            </h4>
            <ul className="mb-14 flex flex-wrap items-center justify-start gap-4">
                {tags?.map((tag, index) => (
                    <li key={tag.id}>
                        <Link
                            href={`/blog?tag=${tag.url}` || '#'}
                            className="inline-block rounded-full bg-neutral-200 px-6 py-3 text-sm font-medium capitalize text-neutral-800 hover:bg-neutral-300"
                        >
                            {tag.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TagsList;
