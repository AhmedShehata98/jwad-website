import PortfolioList from '@/components/PortfolioList';
import {
    getPortfolio,
    getPortfolioCategories,
    getPortfolioList,
} from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import React from 'react';
import { GrFormNextLink } from 'react-icons/gr';

const Portfolio = async () => {
    const portfolio = await getPortfolio();

    return (
        <section
            className="my-20 flex items-center justify-center"
            id={portfolio.data.attributes.section_id}
        >
            <div className="app-container flex flex-col items-center justify-center">
                <span className="flex w-1/2 flex-col items-center justify-center max-md:w-full">
                    <h4 className="text-5xl font-bold leading-[72px] text-darkBlack">
                        {portfolio.data.attributes.heading}
                    </h4>
                    <p className="text-sm font-normal text-[#4F5057] max-sm:text-center">
                        {portfolio.data.attributes.subHeading}
                    </p>
                </span>
                <PortfolioList />
            </div>
        </section>
    );
};

export default Portfolio;
