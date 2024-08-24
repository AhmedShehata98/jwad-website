import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <main className="fle min-h-screen flex-col items-center justify-center bg-gray-100">
            <section className="app-container flex flex-col items-center justify-center">
                <Image
                    src={'/images/error-404.png'}
                    alt="404.png"
                    width={128}
                    height={128}
                    className="mt-28 object-cover object-center"
                />
                <h2 className="mt-6 text-3xl font-bold text-red-600">
                    خطا 404 صفحة غير متواجدة
                </h2>
                <p className="mt-4 text-sm font-medium text-neutral-600">
                    اسف هذه الصفحة التي تحاول الدخول اليها عير موجودة
                </p>
                <Link
                    href={'/'}
                    className="btn mt-12 px-5 py-2 text-lg font-medium"
                >
                    الرجوع الي الرئيسية
                </Link>
            </section>
        </main>
    );
};

export default NotFound;
