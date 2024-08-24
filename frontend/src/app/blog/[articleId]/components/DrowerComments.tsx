'use client';
import AppDrawer from '@/components/AppDrawer';
import Image from 'next/image';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import Turnstile from 'react-turnstile';
import { addCommentAction } from '@/utils/server-actions';
import CommentCard from './CommentCard';
import { useParams } from 'next/navigation';
import { IComment } from '@/types/article';

type Props = {
    onClose: () => void;
    comments: IComment[] | undefined;
};
function DrowerComments({ onClose, comments }: Props) {
    const [turnstileToken, setTurnstileToken] = useState<null | string>(null);
    const [verifyTurnstileToken, setVerifyTurnstileToken] =
        useState<boolean>(false);
    const params = useParams<{ articleId: string }>();

    return (
        <AppDrawer location="right">
            <div className="flex h-screen w-full flex-col bg-mainWhite p-6 shadow-2xl">
                <span className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold"> التعليقات</h1>
                    <button
                        type="button"
                        className="text-neutral-500"
                        onClick={onClose}
                    >
                        <IoClose size={30} />
                    </button>
                </span>
                <form
                    action={addCommentAction}
                    className="mb-8 flex flex-col items-start justify-start gap-2 border p-3 shadow"
                >
                    <span className="flex items-center justify-start gap-3 py-3">
                        <Image
                            src={'/icons/man.png'}
                            alt="man.png"
                            width={42}
                            height={42}
                        />
                        <p className="text-xl capitalize text-neutral-800">
                            ضيف جديد
                        </p>
                    </span>
                    <span className="flex h-32 w-full items-center justify-center">
                        <textarea
                            name="comment"
                            placeholder="write your comment ..."
                            className="inline-block h-full w-full border border-transparent px-3 py-2 focus:border-secondary focus:outline-none"
                        />
                    </span>
                    <div className="flex w-full flex-wrap items-center justify-between gap-2 overflow-x-hidden py-2">
                        <Turnstile
                            sitekey={
                                process.env
                                    .NEXT_PUBLIC_TURNSTILE_SITE_KEY as string
                            }
                            onVerify={console.dir}
                            theme="auto"
                            onError={() => {
                                setTurnstileToken(null);
                                setVerifyTurnstileToken(false);
                            }}
                        />
                        <button
                            disabled={!verifyTurnstileToken}
                            type="submit"
                            className="jus flex items-center gap-2 rounded-md bg-secondary px-4 py-1.5 disabled:bg-gray-400"
                        >
                            <p className="text-lg font-medium text-neutral-800">
                                {verifyTurnstileToken ? (
                                    <>
                                        <IoIosSend />
                                        أرسال
                                    </>
                                ) : (
                                    'بانتظار حل الكابتشا'
                                )}
                            </p>
                        </button>
                    </div>
                </form>
                <ul className="mb-4 grid w-full max-w-full grid-cols-1 gap-3 overflow-y-auto">
                    {(comments?.length! <= 0 || !comments) && (
                        <p className="my-12 rounded-md bg-neutral-200 px-4 py-3 text-lg text-neutral-800">
                            لا توجد تعليقات حتى الأن.
                        </p>
                    )}
                    {comments?.map((comment) => {
                        return (
                            <CommentCard key={comment.id} comment={comment} />
                        );
                    })}
                </ul>
            </div>
        </AppDrawer>
    );
}

export default DrowerComments;
