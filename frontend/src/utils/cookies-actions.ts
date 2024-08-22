'use server';

import { cookies } from 'next/headers';

export const getCookie = (key: string) => cookies().get(key);
export const setCookie = (key: string, value: string) =>
    cookies().set(key, value);
export const deleteCookie = (key: string) => cookies().delete(key);
export const hasCookie = (key: string) => cookies().has(key);
export const getAllCookie = (key: string) => cookies().getAll(key);
