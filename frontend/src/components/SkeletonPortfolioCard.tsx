import React from 'react';

const SkeletonPortfolioCard = () => {
    return (
        <div className="max-md:aspect-[9 / 18] group relative flex w-full max-w-[612px] flex-col items-start justify-center overflow-hidden rounded-xl bg-mainWhite shadow-md max-sm:min-w-full">
            <figure className="mb-4 inline-block h-[412px] w-full animate-pulse rounded-lg bg-gray-200 max-sm:h-[282px]"></figure>
            <div className="flex w-full flex-col items-start justify-start gap-2 p-4">
                <p className="h-10 w-9/12 animate-pulse rounded-lg bg-gray-200 max-sm:h-6"></p>
                <button className="h-16 w-48 animate-pulse rounded-full bg-gray-200 max-sm:h-10 max-sm:w-36"></button>
            </div>
        </div>
    );
};

export default SkeletonPortfolioCard;
