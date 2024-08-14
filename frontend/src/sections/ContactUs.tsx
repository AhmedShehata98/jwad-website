import AppAnchor from '@/components/AppAnchor';
import ContactUsForm from '@/components/ContactUsForm';
import { getContactUs } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';

const ContactUs = async () => {
    const contactUs = await getContactUs();

    return (
        <section
            className="flex w-full items-center justify-center bg-[#F7F7F7] py-20"
            id={contactUs.data.attributes.section_id}
        >
            <div className="app-container flex items-center justify-between gap-8 max-md:flex-col-reverse max-md:gap-2">
                <ContactUsForm
                    buttonLabel={contactUs.data.attributes.send?.[0].label}
                    heading={contactUs.data.attributes.form_heading}
                    inputsList={contactUs.data.attributes.contact_form}
                />

                <div className="flex flex-col max-md:w-full max-sm:items-start">
                    <h4 className="mb-7 text-left text-[32px] font-bold capitalize text-darkBlack">
                        {contactUs.data.attributes.contact_list_heading}
                    </h4>
                    {contactUs.data.attributes?.contact_list?.map(
                        (contact: {
                            id: number;
                            heading: string;
                            value: string;
                        }) => (
                            <span
                                key={contact.id}
                                className="mb-3 flex flex-1 flex-col gap-1 text-left max-sm:text-right"
                            >
                                <p className="text-xl font-semibold text-darkBlack">
                                    {contact.heading}
                                </p>
                                <p className="text-lg font-medium text-[#4F5057]">
                                    {contact.value}
                                </p>
                            </span>
                        )
                    )}

                    <h4 className="mb-7 text-left text-[32px] font-bold capitalize text-darkBlack">
                        {contactUs.data.attributes.third_heading}
                    </h4>
                    <ul className="flex items-center justify-end gap-4">
                        {contactUs.data.attributes.social_media?.map(
                            (link: any) => (
                                <AppAnchor
                                    key={link.id}
                                    href={link.href}
                                    className="flex size-12 items-center justify-center rounded-full border-[3px] border-darkBlack text-xl"
                                    title={link.label}
                                    target="_blank"
                                    rel={'noopener noreferrer'}
                                    fbPixelEventName={link.fb_event}
                                    snapchatPixelEventName={link.snapchat_event}
                                    tiktokEventName={link.tiktok_event}
                                >
                                    <Image
                                        src={imagePrefixURl(
                                            link.icon?.data.attributes.url
                                        )}
                                        alt={
                                            link.icon?.data.attributes
                                                .alternativeText || link.label
                                        }
                                        width={24}
                                        height={24}
                                    />
                                </AppAnchor>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
