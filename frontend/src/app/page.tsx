import About from '@/sections/About';
import ContactUs from '@/sections/ContactUs';
import DreamProject from '@/sections/DreamProject';
import FrequencyQuestions from '@/sections/FrequencyQuestions';
import Hero from '@/sections/Hero';
import Offers from '@/sections/Offers';
import Partners from '@/sections/Partners';
import Portfolio from '@/sections/Portfolio';
import Testimonials from '@/sections/Testimonials';
import { getMetadata } from '@/services/api';
import { Metadata } from 'next';
import { mapSeoToMetadata } from '@/utils/map-seo-data';
import { Seo } from '@/types/seo-types';

export async function generateViewport() {
    const metadata = await getMetadata();
    const { metaViewport } = metadata.data.attributes.seo;

    return {
        viewport: metaViewport,
    };
}
export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getMetadata();
    const { seo, social_media_meta } = metadata.data.attributes;

    if (!seo || !social_media_meta)
        return {
            title: 'جواد | وكالة تسويق',
            description:
                'تحسين الأعمال وبناء ثقة العملاء من خلال مراجعة جميع الأعمال وزيادة المبيعات من خلال خدمات التسويق والإعلان',
            keywords: 'marketing agency, marketing, jwad',
        };

    const generatedMeta = mapSeoToMetadata({
        ...seo,
        metaSocial: social_media_meta,
    });

    return {
        ...generatedMeta,
        openGraph: { ...generatedMeta.openGraph, type: 'website' },
    };
}
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col" id="main-app">
            <Hero />
            <Offers />
            <DreamProject />
            <Portfolio />
            <Partners />
            <About />
            <Testimonials />
            <FrequencyQuestions />
            <ContactUs />
        </main>
    );
}
