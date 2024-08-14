'use client';
import React from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';

const CloseButton = () => {
    const handleCloseMenu = () => {
        const menu = document.querySelector('#navLinks');

        if (!menu) return;
        menu.classList.remove('nav-links-mobile-shown');

        document.body.classList.remove('prevent-body-scroll');
    };
    return (
        <button
            type="button"
            onClick={handleCloseMenu}
            className="text-5xl text-red-500"
        >
            <IoCloseCircleSharp />
        </button>
    );
};

export default CloseButton;
