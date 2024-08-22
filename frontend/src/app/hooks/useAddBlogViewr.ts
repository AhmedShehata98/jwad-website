import { addBlogView, getBlogViewByIP } from '@/services/api';
import { getClientLocation } from '@/services/ipapi';
import { IViewForm } from '@/types/blog';

async function useAddBlogViewr() {
    const clientLocation = await getClientLocation();

    if (!clientLocation) return;

    const viewForm: Omit<IViewForm,'article_id'> = {
        guest_ip: clientLocation.ip,
        city: clientLocation.city,
        country: clientLocation.country,
        time_zone: clientLocation.timezone,
    };
    await addBlogView(viewForm);
}

export default useAddBlogViewr;
