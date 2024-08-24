import CommentCreateForm from './CommentCreateForm';
import { IArticleTag, IComment } from '@/types/article';
import CommentsList from './CommentsList';
import ArticleControls from './ArticleControls';
import TagsList from './TagsList';

type Props = {
    tags: Array<IArticleTag>;
    comments: IComment[] | undefined;
    articleId: string;
    commentsLength: number | undefined;
    articleViews: number | undefined;
    revalidateArticleComments: () => void;
};
function Footer({
    tags,
    comments,
    articleId,
    commentsLength,
    articleViews,
    revalidateArticleComments,
}: Props) {
    return (
        <div className="mt-12 flex w-full flex-col items-start">
            <TagsList tags={tags} />
            <ArticleControls
                className="mb-12"
                articleId={articleId}
                onOpenComments={() => {}}
                commentsLength={commentsLength}
                articleViews={articleViews}
            />
            <CommentCreateForm
                revalidateArticleComments={revalidateArticleComments}
            />
            <CommentsList comments={comments} />
        </div>
    );
}

export default Footer;
