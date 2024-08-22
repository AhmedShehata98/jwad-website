'use server';

export const addCommentAction = (formData: FormData) => {
    const rowFormData = {
        comment: formData.get('comment'),
    };

    console.log(rowFormData);
};
