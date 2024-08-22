import { IComment } from '@/types/article';
import { formatDate } from '@/utils/date-format';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLLIElement> & {
    comment: IComment;
};

const COLORS = [
    '#023047',
    '#bc6c25',
    '#d62828',
    '#3a5a40',
    '#03045e',
    '#2b2d42',
    '#7b2cbf',
];

function CommentCard({ comment, className, ...rest }: Props) {
    const randomIdx = Math.random() * COLORS.length;
    console.log(comment.attributes.replay);
    return (
        <li
            className={twMerge(
                'flex flex-col items-start justify-start gap-5',
                className
            )}
            {...rest}
        >
            <div className="flex items-center justify-start gap-3">
                {comment.attributes?.author && (
                    <p
                        className="flex size-12 items-center justify-center rounded-full text-xl uppercase text-white"
                        style={{
                            backgroundColor:
                                COLORS[Math.floor(randomIdx)] || COLORS[0],
                        }}
                    >
                        {`${comment.attributes?.author.full_name.split(' ')[0]?.charAt(0)}${comment.attributes?.author.full_name.split(' ')[1]?.charAt(0)}`}
                    </p>
                )}

                <span className="flex flex-col items-start justify-center gap-1">
                    <p className="text-lg font-medium">
                        {comment.attributes?.author.full_name}
                    </p>

                    {comment.attributes?.publishedAt && (
                        <time
                            dateTime={formatDate(
                                'ar-SA',
                                comment.attributes?.publishedAt
                            )}
                            className="text-sm font-medium capitalize text-neutral-500"
                        >
                            {formatDate(
                                'ar-SA',
                                comment.attributes?.publishedAt
                            )}
                        </time>
                    )}
                </span>
            </div>
            <div className="flex max-w-full items-start justify-center gap-3 ps-12">
                <p className="text-base text-neutral-600">
                    {comment.attributes.message}
                </p>
            </div>

            {comment.attributes.replay &&
                comment.attributes.replay?.length > 0 && (
                    <ul className="mt-4 flex flex-col items-start justify-center gap-6 ps-6">
                        {comment.attributes.replay.map((reply) => (
                            <CommentCard key={reply.id} comment={reply} />
                        ))}
                    </ul>
                )}
        </li>
    );
}

export default CommentCard;
