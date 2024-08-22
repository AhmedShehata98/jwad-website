import { IComment } from '@/types/article';
import React from 'react';
import CommentCard from './CommentCard';
import { TfiCommentAlt } from 'react-icons/tfi';
import { FaRegClock } from 'react-icons/fa6';

type Props = {
    comments: IComment[] | undefined;
};
function CommentsList({ comments }: Props) {
    return (
        <div className="mb-8 flex w-full flex-col items-center justify-center gap-2">
            <span className="mb-8 flex w-full items-center justify-center gap-3 bg-neutral-100 px-4 py-3">
                <TfiCommentAlt size={25} />
                <h4 className="w-full text-lg font-semibold text-neutral-600 max-sm:w-fit">
                    التعليقات علي هذة المقالة
                </h4>
            </span>
            <ul className="mb-6 flex flex-col items-start justify-center gap-6">
                {comments?.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment} />;
                })}
            </ul>
        </div>
    );
}

export default CommentsList;
