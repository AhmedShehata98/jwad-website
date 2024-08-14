import { BASE_URL } from '@/services/api';

export function imagePrefixURl(path: string) {
    if (!path) return `${BASE_URL}/uploads/`;
    return `${BASE_URL}${path}`;
}
