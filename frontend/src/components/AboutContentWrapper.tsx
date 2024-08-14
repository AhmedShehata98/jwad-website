'use client';
import { getConsultantContent } from '@/services/api';
import { swrKeys } from '@/swr/keys';
import useSWR from 'swr';

const AboutContentWrapper = () => {
    //   const {
    //     data: consultantContentList,
    //     isLoading: isLoadingConsultantContentList,
    //   } = useSWR(swrKeys.aboutContentList, () =>
    //     getConsultantContent({ query: currentFilter! })
    //   );

    return (
        <ul className="flex flex-col text-base font-medium text-[#4F5057]">
            {/* {consultantContentList &&
        consultantContentList.data.map((content) => {
          const splitExtras = content.attributes.extras.split("/n");
          return <li key={content.id}>{splitExtras}</li>;
        })} */}
        </ul>
    );
};

export default AboutContentWrapper;
