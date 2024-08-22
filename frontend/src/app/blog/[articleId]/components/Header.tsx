import { IStrapiImageResponse } from '@/types/common-types';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import ArticleControls from './ArticleControls';

type Props = {
    title: string;
    publisher: {
        name: string;
        avatar: IStrapiImageResponse[] | null;
    };
    publishedAt: string;
    articleId: string;
    commentsLength: number | undefined;
    onOpenComments: () => void;
};

function Header({
    title,
    publishedAt,
    publisher,
    articleId,
    commentsLength,
    onOpenComments,
}: Props) {
    return (
        <div className="mb-10 mt-7 flex w-full flex-col items-start justify-center max-sm:items-center">
            <h2 className="mb-6 text-4xl font-semibold capitalize max-sm:text-center max-sm:text-3xl">
                {title}
            </h2>
            <div className="flex items-center justify-center gap-3">
                {publisher.avatar?.map((img) => {
                    return (
                        <Image
                            src={imagePrefixURl(img.attributes.url as string)}
                            alt={
                                img.attributes.alternativeText || publisher.name
                            }
                            width={54}
                            height={54}
                            className="rounded-full object-cover"
                        />
                    );
                })}

                <span className="flex flex-col items-start justify-center">
                    <p className="font-medium capitalize text-neutral-800">
                        {publisher.name}
                    </p>
                    <small className="text-sm font-medium capitalize text-neutral-500">
                        {publishedAt}
                    </small>
                </span>
            </div>
            <ArticleControls
                articleId={articleId}
                onOpenComments={onOpenComments}
                commentsLength={commentsLength}
            />
        </div>
    );
}

export default Header;
