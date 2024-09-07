import AppAnchor from '@/components/AppAnchor';
import OfferCard from '@/components/OfferCard';
import { getAllMarketingServices, getMarketingService } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';
import { GoArrowLeft } from 'react-icons/go';

const Offers = async () => {
    const marketingService = await getMarketingService();
    const marketingServiceList = await getAllMarketingServices();
    return (
        <section
            className="my-12 flex w-full items-center justify-between gap-6 bg-[#F7F7F7] py-12 max-tablet:p-7 max-md:flex-col max-sm:p-5"
            id={marketingService.data.attributes.section_id}
        >
            <div className="app-container flex items-center justify-between gap-8 p-0 max-[992px]:flex-col max-sm:m-0 lg:items-stretch">
                <div className="flex w-1/3 flex-col gap-4 rounded-2xl bg-mainWhite p-8 max-[992px]:w-full max-md:w-full">
                    <p className="text-[32px] font-semibold text-primary">
                        {marketingService.data.attributes.heading}
                    </p>
                    <p className="text-2xl font-semibold">
                        {marketingService.data.attributes.subHeading}
                    </p>
                    <AppAnchor
                        href={marketingService.data.attributes.link[0].href}
                        className="btn mb-12 mt-3 w-fit px-3 py-2"
                        target="_blank"
                        rel={'noopener noreferrer'}
                        fbPixelEventName={
                            marketingService.data.attributes.link?.[0].fb_event
                        }
                        snapchatPixelEventName={
                            marketingService.data.attributes.link?.[0]
                                .snapchat_event
                        }
                        tiktokEventName={
                            marketingService.data.attributes.link?.[0]
                                .tiktok_event
                        }
                    >
                        {marketingService.data.attributes.link[0].label}
                        <GoArrowLeft className="text-2xl" />
                    </AppAnchor>
                </div>
                <ul className="grid w-3/4 gap-5 max-[992px]:w-full max-sm:grid-cols-1 sm:grid-cols-3">
                    {marketingServiceList.data?.map((mServ: any) => (
                        <OfferCard
                            key={mServ.id}
                            data={{
                                heading: mServ.attributes.heading,
                                description: mServ.attributes.description,
                                icon: mServ.attributes.icon?.data,
                            }}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Offers;
