import TestimonialsCard from '@/components/TestimonialsCard';
import TestimonialsList from '@/components/TestimonialsList';
import { getAllTestimonials, getTestimonial } from '@/services/api';
import { imagePrefixURl } from '@/utils/image-prefix';
import Image from 'next/image';
import React from 'react';
import { IoMdStar } from 'react-icons/io';

const Testimonials = async () => {
    const testimonial = await getTestimonial();
    const allTestimonials = await getAllTestimonials();

    return (
        <section
            className="flex items-center justify-center bg-[#F7F7F7] py-16"
            id={testimonial.data.attributes.section_id}
        >
            <div className="app-container flex flex-col items-center justify-center">
                <p className="text-lg font-semibold text-darkBlack">
                    {testimonial.data.attributes.heading}
                </p>
                <h4 className="text-5xl font-bold leading-[72px] text-darkBlack">
                    {testimonial.data.attributes.subheading}
                </h4>

                <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {allTestimonials.data?.map(
                        (testimonial: any, idx: number) => (
                            <TestimonialsCard
                                key={testimonial.id}
                                data={{
                                    rate: testimonial.attributes.rating,
                                    review: testimonial.attributes.review,
                                    title: testimonial.attributes.title,
                                    userImage: {
                                        ...testimonial.attributes.userImage
                                            .data,
                                    },
                                    username: testimonial.attributes.username,
                                }}
                                active={idx === 0}
                            />
                            // <li
                            //   key={testimonial.id}
                            //   className="flex flex-col items-start justify-start border p-6 border-[#C9CAD6] gap-3 hover:shadow-app-shadow hover:bg-mainWhite"
                            // >
                            //   <span className="flex items-center justify-start text-orange-400 mb-3 text-3xl">
                            //     <IoMdStar />
                            //     <IoMdStar />
                            //     <IoMdStar />
                            //     <IoMdStar />
                            //     <IoMdStar />
                            //   </span>
                            //   <p className="text-[#4F5057] text-lg capitalize mb-3">
                            //     {testimonial.attributes.review}
                            //   </p>
                            //   <div className="flex items-center justify-start gap-3">
                            //     <Image
                            //       src={imagePrefixURl(
                            //         testimonial.attributes.userImage.data.attributes.url
                            //       )}
                            //       alt={
                            //         testimonial.attributes.userImage.data.attributes
                            //           .alternativeText || "customer-img"
                            //       }
                            //       width={48}
                            //       height={48}
                            //     />
                            //     <span className="flex items-start justify-center flex-col">
                            //       <p className="text-xl font-semibold text-darkBlack">
                            //         {testimonial.attributes.username}
                            //       </p>
                            //       <p className="text-lg font-normal text-[#4F5057]">
                            //         {testimonial.attributes.title}
                            //       </p>
                            //     </span>
                            //   </div>
                            // </li>
                        )
                    )}
                    {/* <TestimonialsList data={allTestimonials.data as any} /> */}
                </ul>
            </div>
        </section>
    );
};

export default Testimonials;
