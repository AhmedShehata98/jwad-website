import AppAnchor from '@/components/AppAnchor';
import { getYourDreamProject } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DreamProject = async () => {
    const yourDreamProject = await getYourDreamProject();

    return (
        <section
            className="app-container my-24 flex items-center justify-between gap-4 max-md:flex-col-reverse max-md:justify-center max-md:gap-24"
            id={yourDreamProject.data.attributes.section_id}
        >
            <span className="flex w-3/5 flex-col items-start gap-3 max-md:w-full max-md:items-center">
                <p className="text-5xl font-bold leading-[72px] text-darkBlack max-sm:text-center">
                    {yourDreamProject.data.attributes.heading}
                </p>
                <p className="text-sm font-normal text-[#4F5057] max-sm:text-center">
                    {yourDreamProject.data.attributes.subHeading}
                </p>
                <AppAnchor
                    href={yourDreamProject.data.attributes.link[0].url}
                    className="btn mt-3 px-4 py-2 text-lg font-semibold max-md:w-2/3"
                    target="_blank"
                    rel={'noopener noreferrer'}
                    fbPixelEventName={
                        yourDreamProject.data.attributes.link?.[0].fb_event
                    }
                    snapchatPixelEventName={
                        yourDreamProject.data.attributes.link?.[0]
                            .snapchat_event
                    }
                    tiktokEventName={
                        yourDreamProject.data.attributes.link?.[0].tiktok_event
                    }
                >
                    {yourDreamProject.data.attributes.link[0].label}
                </AppAnchor>

            </span>
            <div className="relative">
                <Image
                    src={imagePrefixURl(
                        yourDreamProject.data.attributes.image?.data.attributes
                            .url
                    )}
                    alt={
                        yourDreamProject.data.attributes.image?.data.attributes
                            .alternativeText
                    }
                    width={530}
                    height={550}
                />
                <Image
                    className="absolute -left-20 top-1/2 max-lg:-left-2 max-md:-bottom-28 max-md:left-1/2 max-md:top-auto max-md:-translate-x-1/2"
                    src={imagePrefixURl(
                        yourDreamProject.data.attributes.pattern_image?.data
                            .attributes.url
                    )}
                    alt={
                        yourDreamProject.data.attributes.pattern_image?.data
                            .attributes.alternativeText || 'dreem-project.svg'
                    }
                    width={202}
                    height={82}
                />
            </div>
        </section>
    );
};

export default DreamProject;
