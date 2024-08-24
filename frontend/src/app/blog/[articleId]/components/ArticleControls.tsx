import DropdownButton, { DropdownOptions } from '@/components/DropdownButton';
import { BASE_URL } from '@/services/api';
import { twMerge } from '@jakxz/tw-classnames';
import { HTMLAttributes } from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLinkSharp, IoLogoWhatsapp } from 'react-icons/io5';
import { LiaComment } from 'react-icons/lia';
import { RiShare2Line } from 'react-icons/ri';
import { VscEye } from 'react-icons/vsc';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

type Props = HTMLAttributes<HTMLDivElement> & {
    onOpenComments: () => void;
    articleId: string;
    articleViews: number | undefined;
    commentsLength: number | undefined;
};
function ArticleControls({
    articleId,
    onOpenComments,
    className,
    commentsLength,
    articleViews,
    ...rest
}: Props) {
    const articleUrl = `${BASE_URL}/blog/${articleId}`;

    const copyArticleLink = (link: string) => {
        navigator.clipboard.writeText(link);
        toast.success('تم نسخ الرابط بنجاح', { autoClose: 2000 });
    };
    const dropdownOptions: DropdownOptions[] = [
        {
            label: (
                <button
                    type="button"
                    role="button"
                    title={'نسخ الرابط'}
                    className="flex items-center justify-start gap-2"
                >
                    <IoLinkSharp size={25} />
                    <p className="line-clamp-1 text-start">نسخ الرابط</p>
                </button>
            ),
            value: articleUrl,
            onClick: (_ev, option) => copyArticleLink(option.value),
        },
        {
            label: (
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-start gap-2"
                >
                    <CiFacebook size={25} />
                    <p className="line-clamp-1 text-start">
                        مشاركة علي facebook
                    </p>
                </a>
            ),
            value: 'https://www.facebook.com/jawad.wad',
        },
        {
            label: (
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-start gap-2"
                >
                    <FaXTwitter size={25} />
                    <p className="line-clamp-1 text-start">
                        مشاركة علي twitter
                    </p>
                </a>
            ),
            value: 'https://www.twitter.com/jawadwad',
        },
        {
            label: (
                <a
                    href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-start gap-2"
                >
                    <CiLinkedin size={25} />
                    <p className="line-clamp-1 text-start">
                        مشاركة علي linkedin
                    </p>
                </a>
            ),
            value: 'https://www.linkedin.com/in/jawad-wad-179944191/',
        },
        {
            label: (
                <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-start gap-2"
                >
                    <IoLogoWhatsapp size={25} />
                    <p className="line-clamp-1 text-start">
                        مشاركة علي whatsapp
                    </p>
                </a>
            ),
            value: 'https://www.whatsapp.com/jawadwad/',
        },
    ];

    return (
        <div
            className={twMerge(
                'mt-5 flex w-full items-center justify-start gap-5 border-y px-1 py-3',
                className
            )}
            {...rest}
        >
            <button
                type="button"
                className="group flex items-center justify-center gap-3"
                onClick={onOpenComments}
            >
                <LiaComment
                    size={25}
                    className="text-neutral-500 group-hover:text-neutral-800"
                />
                <small className="font-medium text-neutral-800 group-hover:font-bold">
                    {commentsLength || 0}
                </small>
            </button>
            <button
                type="button"
                className="group flex items-center justify-center gap-3"
            >
                <VscEye
                    size={25}
                    className="text-neutral-500 group-hover:text-neutral-800"
                />
                <small className="font-medium text-neutral-800 group-hover:font-bold">
                    {articleViews || 0}
                </small>
            </button>
            <DropdownButton
                type="button"
                id={`share-btn-${nanoid(4)}`}
                dropdownContainerClass="max-md:left-0"
                options={dropdownOptions}
                className="group flex cursor-pointer items-center justify-center gap-3"
            >
                <RiShare2Line
                    size={25}
                    className="text-neutral-500 group-hover:text-neutral-800"
                />
                <small className="font-medium text-neutral-800 group-hover:font-bold">
                    مشاركة
                </small>
            </DropdownButton>
        </div>
    );
}

export default ArticleControls;
