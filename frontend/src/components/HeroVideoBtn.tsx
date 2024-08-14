'use client';
import React, { useState } from 'react';
import { FaRegCirclePlay } from 'react-icons/fa6';
import Modal from '@/components/Modal';
import HeroVideoModal from './HeroVideoModal';
import { IStrapiVideoResponse } from '@/types/common-types';
import { imagePrefixURl } from '@/utils/image-prefix';

type Props = {
    btnLabel: string;
    title: string;
    video: IStrapiVideoResponse;
};
const HeroVideoBtn = ({ btnLabel, title, video }: Props) => {
    const [showVideoModal, setShowVideoModal] = useState(false);

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-xl border-[3px] border-primary p-3 text-base font-semibold text-primary hover:rounded-full max-md:w-full"
                onClick={() => setShowVideoModal(true)}
            >
                {btnLabel}
                <FaRegCirclePlay />
            </button>
            {showVideoModal && (
                <Modal>
                    <HeroVideoModal
                        data={{
                            src: imagePrefixURl(video.attributes.url),
                            title,
                            type: video.attributes.mime,
                        }}
                        onClose={() => setShowVideoModal(false)}
                    />
                </Modal>
            )}
        </>
    );
};

export default HeroVideoBtn;
