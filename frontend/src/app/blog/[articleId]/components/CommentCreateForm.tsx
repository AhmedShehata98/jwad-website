'use client';
import { createComment } from '@/services/api';
import { swrKeys } from '@/swr/keys';
import { useParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { BiLoaderAlt } from 'react-icons/bi';
import { ICommentForm } from '@/types/article';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import Turnstile, { BoundTurnstileObject } from 'react-turnstile';

const initialFormValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
};

const WORDS_LENGTH = 200;
const PHONE_NUMBER_REGEX = /^05\d*$/;

type Props = {
    revalidateArticleComments: () => void;
};

function CommentCreateForm({ revalidateArticleComments }: Props) {
    const params = useParams<{ articleId: string }>();
    const [fullName, setFullName] = useState(initialFormValues.fullName);
    const [email, setEmail] = useState(initialFormValues.email);
    const [message, setMessage] = useState(initialFormValues.message);
    const [currentWordsLength, setCurrentWordsLength] = useState(0);
    const [captchaToken, setCaptchaToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(
        initialFormValues.phoneNumber
    );
    const { trigger, isMutating } = useSWRMutation(
        swrKeys.articleComments,
        (_key, { arg }) => createComment(arg) as any
    );

    function resetFields() {
        setFullName('');
        setEmail('');
        setMessage('');
        setPhoneNumber('');
    }

    function handleWordsLength(input: string) {
        const inputLength = input.trim().split(' ').length;
        setCurrentWordsLength(input === '' ? 0 : inputLength);

        console.log(input.trim().split(' '));
        if (inputLength >= WORDS_LENGTH) {
            return false;
        } else {
            return true;
        }
    }

    function handleChangeMessage(ev: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = ev.target.value;

        if (!handleWordsLength(value)) return;
        setMessage(value);
    }

    const handleSubmit = useCallback(
        async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            if (!email || !fullName || !message) {
                toast.error('من فضلك تأكد من ادخال جميع الحقول المطلوبة');
                return;
            }
            const rowCommentData: ICommentForm = {
                article_id: params.articleId,
                blockedThread: false,
                approvalStatus: 'PENDING',
                message: message,
                author: {
                    author_id: nanoid(14),
                    email,
                    full_name: fullName,
                    phone: phoneNumber,
                },
                thread_of: params.articleId,
            };
            const fd = new FormData();
            fd.append('comment', JSON.stringify(rowCommentData));
            fd.append('token', captchaToken);

            try {
                await trigger(fd as any, {
                    revalidate: true,
                    rollbackOnError: true,
                    onSuccess: () => {
                        toast.success('لقد تم ارسال تعليقك بنجاح');
                        revalidateArticleComments();
                        resetFields();
                    },
                    onError: () => {
                        toast.error('حدث خطأ ما, حاول مرة أخرى');
                    },
                    populateCache: true,
                });
            } catch (error) {
                console.error(error);
            }
        },
        [fullName, email, phoneNumber, message]
    );

    const handleVerifyCaptcha = (
        token: string,
        boundTurnstile: BoundTurnstileObject
    ) => {
        if (!token) {
            toast.error('من فضلك قم بتحقق من الكابتشا');
            return;
        }
        console.dir(boundTurnstile, { depth: null });

        setCaptchaToken(token);
    };

    return (
        <div className="mb-6 flex w-full items-center justify-center">
            <form onSubmit={(ev) => handleSubmit(ev)} className="w-full">
                <h3 className="mb-4 text-2xl font-semibold text-neutral-800">
                    اكتب تعليق
                </h3>
                {fullName && (
                    <span className="mb-4 flex items-center justify-center">
                        <p className="flex size-16 items-center justify-center rounded-full bg-primary text-2xl font-bold uppercase text-white shadow">
                            {`${fullName?.charAt(0)}${fullName.split(' ')[1]?.charAt(0)}`}
                        </p>
                    </span>
                )}
                <span className="mb-2.5 flex w-full items-center justify-between gap-3 max-sm:flex-col">
                    <input
                        type="text"
                        placeholder="اسمك كامل *"
                        name="fullName"
                        value={fullName}
                        required
                        onChange={(ev) => setFullName(ev.target.value)}
                        className="flex-1 border border-transparent bg-gray-100 p-3 focus:border-neutral-700 focus:shadow focus:outline-none max-sm:w-full"
                    />
                    <span className="flex flex-1 flex-col items-start justify-center gap-1 max-sm:w-full">
                        <input
                            type="tel"
                            placeholder="رقم الهاتف ( اختياري )"
                            name="phoneNumber"
                            value={phoneNumber}
                            dir="rtl"
                            maxLength={10}
                            onChange={(ev) => setPhoneNumber(ev.target.value)}
                            className="w-full border border-transparent bg-gray-100 p-3 focus:border-neutral-700 focus:shadow focus:outline-none"
                        />
                        {!PHONE_NUMBER_REGEX.test(phoneNumber) &&
                            phoneNumber.length >= 1 && (
                                <small className="font-medium text-red-600">
                                    رقم الهاتف يجب ان يبدأ بـ ( 05 ) و لا يزيد
                                    طوله عن ( 10 ) ارقام
                                </small>
                            )}
                    </span>
                </span>
                <span className="mb-5 flex w-full items-center justify-start gap-3">
                    <input
                        type="email"
                        placeholder="البريد الالكتروني *"
                        name="email"
                        value={email}
                        required
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="w-full border border-transparent bg-gray-100 px-3 py-2 focus:border-neutral-700 focus:shadow focus:outline-none"
                    />
                </span>
                <div className="mb-5 flex w-full flex-col items-start justify-center">
                    <textarea
                        name="message"
                        id="message"
                        required
                        onChange={handleChangeMessage}
                        value={message}
                        placeholder="اكتب التعليق ..."
                        className="min-h-16 w-full border border-transparent bg-gray-100 p-3 focus:border-neutral-700 focus:shadow focus:outline-none"
                    ></textarea>
                    <span className="flex w-full items-center justify-between gap-4 pb-2 pt-1 font-medium md:w-max">
                        <p>عدد الحروف المدخلة </p>
                        <p className="text-neutral-500">
                            {currentWordsLength || 'لا شيء'}
                        </p>
                    </span>
                </div>
                <div className="mb-3">
                    <Turnstile
                        sitekey={
                            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string
                        }
                        onVerify={handleVerifyCaptcha}
                    />
                </div>
                <div className="flex w-full items-center justify-between gap-2 max-sm:flex-col max-sm:gap-4">
                    <button
                        type="submit"
                        className="btn flex-1 px-4 py-2.5 disabled:cursor-no-drop disabled:outline-gray-400 max-sm:w-full"
                        disabled={isMutating || captchaToken === ''}
                    >
                        {isMutating ? <BiLoaderAlt /> : 'ارسال تعليق'}
                    </button>
                    <button
                        type="button"
                        className="flex-1 rounded-xl border-4 border-primary px-4 py-3 text-primary hover:rounded-full max-sm:w-full"
                        onClick={resetFields}
                    >
                        افراغ الحقول
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CommentCreateForm;
