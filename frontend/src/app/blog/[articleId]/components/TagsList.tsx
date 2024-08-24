import { IArticleTag } from '@/types/article';
import TagCard from './TagCard';

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
                {tags?.map((tag) => <TagCard key={tag.id} tag={tag} />)}
            </ul>
        </div>
    );
}

export default TagsList;
