import { twMerge } from '@jakxz/tw-classnames';
import React from 'react';
import { GrClose } from 'react-icons/gr';

type Props = {
    onClose: () => void;
    title: string;
    src: string;
    type: string;
};

const PortfolioVideoModal = ({ onClose, src, title, type }: Props) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, []);

    return (
        <section
            className={twMerge(
                'fixed inset-0 z-50 flex items-center justify-center bg-stone-700 bg-opacity-50',
                !mounted && 'scale-110 opacity-10'
            )}
        >
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-stone-700 bg-neutral-900 p-3 shadow-2xl md:w-4/5 lg:w-4/6 xl:w-1/2">
                <span className="flex w-full items-center justify-between py-3">
                    <button
                        onClick={onClose}
                        type="button"
                        className="bg-red-500 px-3 py-2.5 text-black hover:bg-red-600"
                    >
                        <GrClose className="text-xl" />
                    </button>
                    <p className="mx-auto text-lg font-medium capitalize text-slate-100">
                        {title}
                    </p>
                </span>
                <video className="size-full rounded-lg" controls muted>
                    <source src={src} type={type} />
                </video>
            </div>
        </section>
    );
};

export default PortfolioVideoModal;
