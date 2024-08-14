'use client';
import { twMerge } from '@jakxz/tw-classnames';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

const NavLink = ({
    children,
    href,
    active,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    active: boolean;
    onClick?: () => void;
}) => {
    const handleCloseNavMenu = (evt: MouseEvent<HTMLParagraphElement>) => {
        const navLinksContainer = document.querySelector('#navLinks');

        if (!navLinksContainer) {
            console.error('Navigation links container is not available');
            return;
        }
        navLinksContainer.classList.remove('nav-links-mobile-shown');
    };

    return (
        <Link
            className={twMerge('nav-link', active && 'nav-link__active')}
            href={href}
            onClick={onClick}
        >
            <p
                className="text-base font-bold leading-6"
                onClick={handleCloseNavMenu}
            >
                {children}
            </p>
        </Link>
    );
};

export default NavLink;
