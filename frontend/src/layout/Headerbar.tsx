import AppAnchor from '@/components/AppAnchor';
import CloseButton from '@/components/CloseButton';
import NavigationLinks from '@/components/NavigationLinks';
import OpenMenuButton from '@/components/OpenMenuButton';
import { getAllNavLinks, getHeader } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import Link from 'next/link';

const Headerbar = async () => {
    const navLinksList = await getAllNavLinks();
    const headerItems = await getHeader();

    return (
        <header className="app-header">
            <div className="flex w-full items-center justify-between gap-8">
                <Link href={'/'}>
                    <Image
                        src={imagePrefixURl(
                            headerItems.data.attributes.logo.data.attributes.url
                        )}
                        width={132}
                        height={56}
                        alt={
                            headerItems.data.attributes.logo.data.attributes
                                .alternativeText || 'logo.svg'
                        }
                        className="max-sm:w-[112px]"
                    />
                </Link>
                <div
                    // ref={navLinks}
                    id="navLinks"
                    className="nav-links-mobile flex items-center justify-center gap-3 overflow-x-auto transition-transform duration-300"
                >
                    <span className="mb-10 flex w-full items-center justify-end px-8 lg:hidden">
                        <CloseButton />
                    </span>
                    <NavigationLinks links={navLinksList.data} />
                </div>
                <OpenMenuButton />

                <AppAnchor
                    href={headerItems.data.attributes.cta_btn?.[0].href}
                    target="_blank"
                    rel={'noopener noreferrer'}
                    fbPixelEventName={
                        headerItems.data.attributes.cta_btn?.[0].fb_event
                    }
                    snapchatPixelEventName={
                        headerItems.data.attributes.cta_btn?.[0].snapchat_event
                    }
                    tiktokEventName={
                        headerItems.data.attributes.cta_btn?.[0].tiktok_event
                    }
                    className="flex shrink-0 items-center gap-4 rounded-lg border-4 border-[#611E34] px-5 py-4 text-lg font-semibold text-[#611E34] hover:rounded-full max-lg:hidden"
                >
                    {headerItems.data.attributes.cta_btn?.[0].label}
                    <Image
                        src={imagePrefixURl(
                            headerItems.data.attributes.cta_btn?.[0].icon.data
                                .attributes.url
                        )}
                        alt={
                            headerItems.data.attributes.cta_btn?.[0].icon.data
                                .attributes.alternativeText
                        }
                        width={24}
                        height={24}
                    />
                </AppAnchor>
            </div>
        </header>
    );
};

export default Headerbar;
