'use client';
import { twMerge } from '@jakxz/tw-classnames';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export type DropdownOptions = {
    label: React.ReactNode;
    value: string;
    onClick?: (
        ev: React.MouseEvent<HTMLElement, MouseEvent>,
        option: Omit<DropdownOptions, 'onClick'>
    ) => void;
};

type Props = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    dropdownClass?: string;
    dropdownContainerClass?: string;
    dropdownOptionClass?: string;
    options: DropdownOptions[];
    children?: React.ReactNode;
};
function DropdownButton({
    children,
    dropdownClass,
    dropdownContainerClass,
    dropdownOptionClass,
    className,
    id,
    options,
    ...rest
}: Props) {
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const [isShowing, setIsShowing] = useState(false);
    useOnClickOutside(dropdownRef, () => setIsShowing(false));

    return (
        <div className="relative flex flex-col items-start justify-start gap-2">
            <button
                type="button"
                className={twMerge(
                    'z-10 flex w-full items-center justify-center',
                    className
                )}
                id={id}
                onClick={() => setIsShowing((p) => !p)}
                {...rest}
            >
                {children}
            </button>
            <ul
                className={twMerge(
                    'pointer-events-none absolute right-0 top-full flex min-w-max -translate-y-8 scale-90 flex-col items-start justify-center gap-3 rounded-md border bg-mainWhite p-2 opacity-0 shadow-xl transition-all',
                    dropdownContainerClass,
                    isShowing &&
                        'pointer-events-auto translate-y-0 scale-100 opacity-100'
                )}
                ref={dropdownRef}
            >
                {options?.map((option) => {
                    return (
                        <li
                            key={option.value}
                            className={twMerge(
                                'flex w-full items-center justify-start gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[#4F5057] hover:bg-neutral-200',
                                dropdownOptionClass
                            )}
                            onClick={(ev) => {
                                setIsShowing(false);

                                if (!option.onClick) return;
                                option.onClick(ev, option);
                            }}
                        >
                            {option.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default DropdownButton;
