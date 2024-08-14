import QuestionAndAnswersCard from '@/components/QuestionAndAnswersCard';
import {
    getAllFrequentlyQuestion,
    getFrequentlyQuestion,
} from '@/services/api';

async function FrequencyQuestions() {
    const frequentlyQuestion = await getFrequentlyQuestion();
    const allFrequentlyQuestions = await getAllFrequentlyQuestion();

    return (
        <section
            className="flex w-full items-center justify-center"
            id={frequentlyQuestion.data.attributes.section_id}
        >
            <div className="app-container flex flex-col items-center justify-center py-20">
                <h4 className="text-5xl leading-[72px] text-darkBlack">
                    {frequentlyQuestion.data.attributes.heading}
                </h4>

                <ul className="grid w-full grid-cols-1 items-center justify-center gap-4 max-sm:p-0 max-sm:px-4 tablet:w-3/4 xl:w-5/12">
                    {allFrequentlyQuestions.data?.map((question: any) => (
                        <QuestionAndAnswersCard
                            key={question.id}
                            question={question.attributes}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default FrequencyQuestions;
