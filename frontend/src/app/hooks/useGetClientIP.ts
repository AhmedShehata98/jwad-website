import React from 'react';
import { headers } from 'next/headers';

function useGetClientIP() {
    const headersList = headers();
    const ipAddress =
        headersList.get('x-forwarded-for') || headersList.get('x-real-ip');

    if (!ipAddress) {
        return null;
    }
    return ipAddress.split(',')[0];
}

export default useGetClientIP;
