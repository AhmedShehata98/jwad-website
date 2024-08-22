'use client';
import { createArticleView } from '@/services/api';
import { useEffect, useState } from 'react';

function useAddArticleViewer(articleId: string) {
    const [articleViews, setArticleViews] = useState([]);
    if (!articleId) {
        console.error('PLEASE PROVIDE AN ARTICLE ID');
        return;
    }

    useEffect(() => {
        createArticleView(articleId)
            .then(() => {
                // setArticleViews;
                console.log('ARTICLE VIEW OK .');
            })
            .catch((err) => console.error(err));
    }, [createArticleView, articleId]);
}

export default useAddArticleViewer;
