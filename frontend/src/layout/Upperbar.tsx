import { getUpperBar, getUpperBarSocial } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import { IoCallOutline } from 'react-icons/io5';

const Upperbar = async () => {
    const upperbarItems = await getUpperBar();
    const upperbarSocial = await getUpperBarSocial();

    return (
        <div className="bg-darkBlack py-3 max-sm:hidden">
            <div className="app-container flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    {upperbarSocial.data?.map((item: any) => (
                        <a
                            href={item.attributes.href}
                            key={item.id}
                            target="_blank"
                            className="text-mainWhite"
                        >
                            <Image
                                src={imagePrefixURl(
                                    item.attributes.icon.data.attributes.url
                                )}
                                alt={item.attributes.icon.data.attributes.url}
                                width={32}
                                height={32}
                            />
                        </a>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4 text-mainWhite">
                    <p>{upperbarItems.data.attributes.working_days}</p>
                </div>
                <div className="flex items-center justify-center gap-4 text-mainWhite">
                    <a href="" className="text-mainWhite">
                        {upperbarItems.data.attributes.contact_phone}
                    </a>
                    <IoCallOutline className="text-xl" />
                </div>
            </div>
        </div>
    );
};

export default Upperbar;
