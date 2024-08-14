'use client';
import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

const OpenMenuButton = () => {
    const handleToggleMenu = () => {
        const menu = document.querySelector('#navLinks');

        if (!menu) return;
        menu.classList.toggle('nav-links-mobile-shown');

        document.body.classList.toggle('prevent-body-scroll');
    };
    return (
        <button
            type="button"
            onClick={handleToggleMenu}
            className="text-4xl lg:hidden"
        >
            <BiMenuAltLeft />
        </button>
    );
};

export default OpenMenuButton;
