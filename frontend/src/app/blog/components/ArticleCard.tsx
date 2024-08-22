import { IArticleCard } from '@/types/article';
import { imagePrefixURl } from '@/utils/image-prefix';
import { twMerge } from '@jakxz/tw-classnames';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { GrFormNextLink } from 'react-icons/gr';

type Props = HTMLAttributes<HTMLLIElement> & {
    dir: 'col' | 'row';
    fullWidth?: boolean;
    article: IArticleCard;
};
function ArticleCard({
    article,
    dir,
    fullWidth = false,
    className,
    ...rest
}: Props) {
    return (
        <li
            className={twMerge(
                'article-card group',
                fullWidth && 'w-full',
                className
            )}
            {...rest}
        >
            <Link
                href={`blog/${article.id}`}
                className={twMerge(
                    'article-card__link',
                    dir === 'col' ? 'flex-col' : 'flex-row max-md:flex-col'
                )}
            >
                <figure
                    className={twMerge(
                        'group relative flex aspect-[2/3] items-center justify-center overflow-hidden max-md:h-[420px] max-sm:h-[340px]',
                        dir === 'row'
                            ? 'max-md:w-full md:h-[320px] md:w-[500px]'
                            : 'h-[340px] w-full max-lg:h-[240px]'
                    )}
                >
                    <span className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 scale-125 items-center justify-center gap-2 rounded-md bg-secondary bg-opacity-50 px-3 py-3 text-white opacity-0 shadow-xl transition-all group-hover:scale-100 group-hover:opacity-100">
                        <p className="text-lg font-bold"> اذهب للمقالة</p>
                        <GrFormNextLink
                            size={25}
                            className="inline-block rotate-[220deg]"
                        />
                    </span>
                    <Image
                        src={imagePrefixURl(
                            article.attributes.thumbnail.data?.attributes
                                .url as string
                        )}
                        alt={
                            article.attributes.thumbnail.data?.attributes
                                .alternativeText || 'article-img'
                        }
                        width={500}
                        height={300}
                        className="h-full w-full overflow-hidden rounded-md object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                </figure>
                <div
                    className={twMerge(
                        'flex h-fit flex-col items-start justify-start px-2 py-4',
                        dir === 'row' ? 'w-3/5 max-md:w-full' : 'w-full'
                    )}
                >
                    <h3 className="mb-5 line-clamp-3 text-2xl font-bold text-neutral-800 max-lg:mb-2 max-lg:text-xl md:min-h-16">
                        {article?.attributes?.title}
                    </h3>
                    <small className="mb-4 line-clamp-4 text-sm font-medium text-neutral-500 md:min-h-20">
                        {article?.attributes?.description}
                    </small>
                    <div className="mt-7 flex items-center justify-start gap-3">
                        <figure className="h-10 w-10">
                            <Image
                                src={'https://picsum.photos/120/121'}
                                alt="publisher-img"
                                width={42}
                                height={42}
                                className="overflow-hidden rounded-full object-cover object-center"
                            />
                        </figure>
                        <span className="flex flex-col items-start justify-center">
                            <p className="font-semibold capitalize text-neutral-800">
                                {
                                    article?.attributes?.publisher.data
                                        .attributes.name
                                }
                            </p>
                            <small className="text-sm font-semibold capitalize text-neutral-500">
                                {article?.attributes?.publishedAt}
                            </small>
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default ArticleCard;
