'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { StrapiResponse } from '@/services/api';

type Props = {
    data: StrapiResponse<any>;
};
const TestimonialsList = ({}: Props) => {
    return (
        <div className="w-full max-w-full">
            <Swiper className="w-full max-w-full"></Swiper>
        </div>
    );
};

export default TestimonialsList;
