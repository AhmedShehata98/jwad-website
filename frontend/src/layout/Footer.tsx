import { getFooter } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';

const Footer = async () => {
    const footer = await getFooter();

    return (
        <footer className="flex min-h-[75vh] w-full flex-col items-start justify-start gap-2 bg-darkBlack px-24 pb-20 pt-32 max-tablet:px-0 max-tablet:pt-12 max-md:px-8 max-md:pb-14 max-md:pt-20 max-sm:px-3 max-sm:pt-14">
            <div className="app-container flex items-start justify-start gap-10 max-lg:flex-col max-tablet:gap-20">
                <div className="w-64 max-md:w-full">
                    <Image
                        src={imagePrefixURl(
                            footer.data.attributes.logo?.data.attributes.url
                        )}
                        alt={
                            footer.data.attributes.logo?.data.attributes
                                .alternativeText
                        }
                        width={200}
                        height={88}
                    />
                    <p className="mt-2 text-sm text-[#B6B7C2]">
                        {footer.data.attributes.subheading}
                    </p>
                    <ul className="mt-5 flex items-center justify-start gap-2 text-xl text-mainWhite">
                        {footer.data.attributes?.social_media?.map(
                            (socialMedia) => {
                                return (
                                    <a
                                        key={socialMedia.id}
                                        href={socialMedia.url || undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={imagePrefixURl(
                                                socialMedia?.icon?.data
                                                    .attributes.url
                                            )}
                                            alt={
                                                socialMedia?.icon?.data
                                                    .attributes.alternativeText
                                            }
                                            width={24}
                                            height={24}
                                        />
                                    </a>
                                );
                            }
                        )}
                    </ul>
                </div>
                <div className="flex w-full items-start justify-start gap-16 max-md:flex-col max-md:items-center max-md:justify-between max-sm:gap-8">
                    {footer.data.attributes.navigation_links?.map((link) => {
                        return (
                            <div
                                key={link.id}
                                className="flex flex-1 flex-col items-start justify-start gap-3"
                            >
                                <h4 className="text-xl font-semibold text-mainWhite">
                                    {link.heading}
                                </h4>
                                <ul className="grid grid-cols-1 gap-2 pt-2">
                                    {link.links?.map((item: any) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-base font-medium text-[#B6B7C2]"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
            <figure className="mx-auto mt-10 flex items-center justify-center gap-3 max-sm:hidden">
                <h3 className="text-7xl font-bold uppercase text-mainWhite max-lg:text-5xl">
                    {footer.data.attributes.ad.heading}
                </h3>
                <Image
                    src={imagePrefixURl(
                        footer.data?.attributes.ad.icon?.data?.attributes.url
                    )}
                    alt={
                        footer.data?.attributes.ad.icon?.data?.attributes
                            .alternativeText
                    }
                    width={90}
                    height={90}
                />
            </figure>
        </footer>
    );
};

export default Footer;
