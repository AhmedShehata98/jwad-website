'use client';
import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { twMerge } from '@jakxz/tw-classnames';

type Props = {
    question: {
        id: string;
        question: string;
        answer: string;
    };
};
const QuestionAndAnswersCard = ({ question }: Props) => {
    const [opened, setOpened] = useState(false);
    return (
        <li
            className={twMerge(
                'flex flex-col items-start justify-center gap-3 border border-[#EBEBEB] p-4',
                opened && 'bg-mainWhite shadow-app-shadow'
            )}
            id="question-box"
        >
            <div className="flex w-full items-center justify-between gap-8 text-darkBlack">
                <p className="text-xl font-semibold capitalize">
                    {question.question}
                </p>
                <button
                    type="button"
                    className={twMerge(
                        'text-3xl text-darkBlack transition-transform',
                        opened && 'rotate-45'
                    )}
                    onClick={() => setOpened((p) => !p)}
                >
                    <FiPlusCircle />
                </button>
            </div>

            <div className={twMerge('p-2', opened ? 'inline-block' : 'hidden')}>
                <p className="text-base font-normal text-darkBlack">
                    {question.answer}
                </p>
            </div>
        </li>
    );
};

export default QuestionAndAnswersCard;
