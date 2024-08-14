'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children }: { children: React.ReactNode }) {
    const [mounted, seMounted] = useState(false);
    let [container, setContainer] = useState<Element | null>(null);

    useEffect(() => {
        seMounted(true);

        return () => {
            seMounted(false);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        setContainer(document.querySelector('#modal'));
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'initial';
        };
    }, []);

    return mounted ? createPortal(children, container as Element) : null;
}

export default Modal;
