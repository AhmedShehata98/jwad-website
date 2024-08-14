import { getPartners, getPartnersList } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';

const Partners = async () => {
    const partners = await getPartners();
    const partnersList = await getPartnersList();

    return (
        <section
            className="flex w-full flex-col items-center justify-center gap-3 bg-[#F7F7F7] py-32"
            id={partners.data.attributes.section_id}
        >
            <h4 className="text-5xl font-bold capitalize leading-[72px]">
                {partners.data.attributes.heading}
            </h4>

            <ul className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {partnersList.data?.map((partner: any, idx: number) => (
                    <li
                        className="flex shrink-0 items-center justify-center rounded-xl bg-mainWhite p-[25px] shadow-app-shadow"
                        key={partner.id}
                    >
                        <Image
                            src={imagePrefixURl(
                                partner.attributes.image?.data.attributes.url
                            )}
                            alt={
                                partner.attributes.image?.data.attributes
                                    .alternativeText || 'partner.svg'
                            }
                            width={200}
                            height={72}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Partners;
