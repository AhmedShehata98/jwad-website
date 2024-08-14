import AppAnchor from '@/components/AppAnchor';
import HeroVideoBtn from '@/components/HeroVideoBtn';
import {
    getAllHeroStatistics,
    getHeroItems,
    getYourDreamProject,
} from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { IoArrowBackOutline } from 'react-icons/io5';

const Hero = async () => {
    const heroItems = await getHeroItems();
    const statisticsList = await getAllHeroStatistics();

    return (
        <section
            className="w-full bg-mainWhite"
            id={heroItems.data.attributes.section_id}
        >
            <div className="app-container flex flex-col items-center justify-between pb-20">
                <div className="flex w-full items-center justify-between max-tablet:flex-col-reverse max-md:justify-center">
                    <div className="w-full tablet:w-3/5">
                        <p className="mb-3 text-3xl font-semibold text-[#4F5057] max-tablet:mt-10 max-tablet:text-center">
                            {heroItems.data.attributes.heading}
                        </p>
                        <h4 className="text-5xl font-semibold text-darkBlack max-tablet:text-center">
                            {heroItems.data.attributes.subHeading}
                        </h4>
                        <Image
                            src={imagePrefixURl(
                                heroItems.data.attributes.heading_pattern_image
                                    ?.data.attributes.url
                            )}
                            width={256}
                            height={256}
                            alt={
                                heroItems.data.attributes.heading_pattern_image
                                    ?.data.attributes.alternativeText ||
                                'patters-1.svg'
                            }
                            className="ms-20 mt-3 max-tablet:hidden"
                        />
                        <div className="mt-14 flex items-center justify-start gap-3 max-tablet:items-center max-tablet:justify-center max-md:flex-col max-md:gap-8">
                            <AppAnchor
                                href={
                                    heroItems.data.attributes
                                        .discovery_link?.[0].url
                                }
                                className="btn px-2 py-2 max-md:w-full"
                                target="_blank"
                                rel={'noopener noreferrer'}
                                fbPixelEventName={
                                    heroItems.data.attributes
                                        .discovery_link?.[0].fb_event
                                }
                                snapchatPixelEventName={
                                    heroItems.data.attributes
                                        .discovery_link?.[0].snapchat_event
                                }
                                tiktokEventName={
                                    heroItems.data.attributes
                                        .discovery_link?.[0].tiktok_event
                                }
                            >
                                {
                                    heroItems.data.attributes
                                        .discovery_link?.[0].label
                                }
                                <IoArrowBackOutline />
                            </AppAnchor>
                            <HeroVideoBtn
                                btnLabel={
                                    heroItems.data.attributes.discovery_link[1]
                                        .label
                                }
                                video={heroItems.data.attributes.video.data}
                                title={heroItems.data.attributes.video_title}
                            />
                        </div>
                    </div>
                    <div className="w-full p-8 max-tablet:p-0 md:w-2/5">
                        <div className="relative flex size-fit">
                            <Image
                                src={imagePrefixURl(
                                    heroItems.data.attributes.sales_image?.data
                                        .attributes.url
                                )}
                                width={160}
                                height={140}
                                alt={
                                    heroItems.data.attributes.sales_image?.data
                                        .attributes.alternativeText ||
                                    'pattern-2.svg'
                                }
                                className="absolute right-8 top-28"
                            />
                            <Image
                                src={imagePrefixURl(
                                    heroItems.data.attributes.image?.data
                                        .attributes.url
                                )}
                                width={500}
                                height={450}
                                alt={
                                    heroItems.data.attributes.image?.data
                                        .attributes.alternativeText ||
                                    'pattern-image.svg'
                                }
                            />
                            <Image
                                src={imagePrefixURl(
                                    heroItems.data.attributes.our_team_image
                                        ?.data.attributes.url
                                )}
                                width={224}
                                height={144}
                                alt={
                                    heroItems.data.attributes.our_team_image
                                        ?.data.attributes.alternativeText ||
                                    'pattern-2.svg'
                                }
                                className="absolute -bottom-16 -left-4"
                            />
                        </div>
                    </div>
                </div>
                <ul className="mt-14 grid w-full grid-cols-1 gap-11 max-md:hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {statisticsList.data?.map((statistic: any) => (
                        <li
                            key={statistic.id}
                            className={twMerge(
                                'flex flex-col items-center justify-center gap-3 rounded-xl p-6'
                            )}
                            style={{
                                backgroundColor: statistic.attributes.color,
                            }}
                        >
                            <p className="text-5xl font-medium text-darkBlack">
                                {statistic.attributes.heading}
                            </p>
                            <p className="text-2xl font-normal text-darkBlack">
                                {statistic.attributes.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Hero;
