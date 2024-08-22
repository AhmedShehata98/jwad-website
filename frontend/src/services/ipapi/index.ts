import { LocationInfo } from '@/types/ipapi';

export const getClientLocation = async (): Promise<LocationInfo> => {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
};
