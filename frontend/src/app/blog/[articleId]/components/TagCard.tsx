import { IArticleTag } from '@/types/article';
import Link from 'next/link';
import React from 'react';

type Props = {
    tag: IArticleTag;
};
function TagCard({ tag }: Props) {
    return (
        <li>
            <Link
                href={`/blog?tag=${tag.normalized}` || '#'}
                className="inline-block rounded-full bg-neutral-200 px-6 py-3 text-sm font-medium capitalize text-neutral-800 shadow-sm hover:bg-neutral-300"
            >
                {tag.name}
            </Link>
        </li>
    );
}

export default TagCard;
