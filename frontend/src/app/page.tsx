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
import { Metadata, Viewport } from 'next';
import { imagePrefixURl } from '@/utils/image-prefix';

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

    const twitter = social_media_meta?.find(
        (attr) => attr.socialNetwork === 'Twitter'
    );

    const facebook = social_media_meta?.find(
        (attr) => attr.socialNetwork === 'Facebook'
    );

    if (!seo || !social_media_meta)
        return {
            title: 'جواد | وكالة تسويق',
            description:
                'تحسين الأعمال وبناء ثقة العملاء من خلال مراجعة جميع الأعمال وزيادة المبيعات من خلال خدمات التسويق والإعلان',
            keywords: 'marketing agency, marketing, jwad',
        };

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        keywords: seo.keywords,
        robots: seo.metaRobots,
        alternates: {
            canonical: seo.canonicalURL,
        },
        icons: imagePrefixURl(seo.metaImage.data.attributes.url),
        openGraph: {
            title: facebook?.title,
            description: facebook?.description,
            images: {
                url: imagePrefixURl(facebook?.image.data.attributes.url!),
                width: facebook?.image.data.attributes.width,
                height: facebook?.image.data.attributes.height,
                type: facebook?.image.data.attributes.mime,
                alt: facebook?.image.data.attributes.alternativeText,
            },
        },
        twitter: {
            title: twitter?.title,
            description: twitter?.description,
            images: {
                url: imagePrefixURl(twitter?.image.data.attributes.url!),
                width: twitter?.image.data.attributes.width,
                height: twitter?.image.data.attributes.height,
                type: twitter?.image.data.attributes.mime,
                alt: twitter?.image.data.attributes.alternativeText,
            },
        },
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
