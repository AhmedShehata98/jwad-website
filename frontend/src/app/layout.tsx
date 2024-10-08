import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import Upperbar from '@/layout/Upperbar';
import Headerbar from '@/layout/Headerbar';
import Footer from '@/layout/Footer';
import FacebookPixel from '@/components/FacebookPixel';
import SnapchatPixel from '@/components/SnapchatPixel';
import TikTokPixel from '@/components/TikTokPixel';
import WhatsappBtn from '@/components/WhatsappBtn';
import StructuredDataMetadata from '@/components/StructuredDataMetadata';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rubik = Rubik({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Jwad',
    description: 'digital marketing agency',
};
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={rubik.className}>
                <div id="modal"></div>
                <ToastContainer
                    theme="light"
                    position="bottom-right"
                    rtl
                    stacked
                    autoClose={4000}
                />
                <StructuredDataMetadata />
                <FacebookPixel />
                <SnapchatPixel />
                <TikTokPixel />
                <Upperbar />
                <Headerbar />
                {children}
                <Footer />
                <WhatsappBtn />
            </body>
        </html>
    );
}
