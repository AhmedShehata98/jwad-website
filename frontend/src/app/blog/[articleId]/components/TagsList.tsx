import { IArticleTag } from '@/types/article';
import Link from 'next/link';

type Props = {
    tags: IArticleTag[];
};
function TagsList({ tags }: Props) {
    return (
        <div>
            <h4 className="mb-3 mt-6 text-lg font-semibold capitalize">
                العلامات
            </h4>
            <ul className="mb-14 flex flex-wrap items-center justify-start gap-4">
                {tags?.map((tag, index) => (
                    <li key={tag.id}>
                        <Link
                            href={`/blog?tag=${tag.normalized}` || '#'}
                            className="inline-block rounded-full bg-neutral-200 px-6 py-3 text-sm font-medium capitalize text-neutral-800 shadow-sm hover:bg-neutral-300"
                        >
                            {tag.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TagsList;
