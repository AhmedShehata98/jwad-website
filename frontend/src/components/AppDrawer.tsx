'use client';
import { twMerge } from '@jakxz/tw-classnames';
import React, { HTMLAttributes } from 'react';
import Modal from './Modal';

type Props = HTMLAttributes<HTMLDivElement> & {
    location: 'left' | 'right';
    children: React.ReactNode;
    onClose?: () => void;
};

function AppDrawer({ location, children, onClose, className, ...rest }: Props) {
    return (
        <Modal>
            <div
                className={twMerge(
                    'fixed top-0 z-40 flex w-[85%] max-w-[85%] flex-col items-center justify-start gap-1 bg-neutral-800 bg-opacity-20 md:w-[75%] md:max-w-[75%] tablet:w-[40%] tablet:max-w-[40%] lg:w-[33.3%] lg:max-w-[33.3%]',
                    className,
                    location === 'left' ? 'left-0' : 'right-0'
                )}
                {...rest}
            >
                {children}
            </div>
        </Modal>
    );
}

export default AppDrawer;
