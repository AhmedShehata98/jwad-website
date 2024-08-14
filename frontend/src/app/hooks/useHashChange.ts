import { useParams } from 'next/navigation';
import React from 'react';

function useHashChange() {
    const params = useParams();
    const [hash, setHash] = React.useState('');

    React.useEffect(() => {
        const hash = window.location.hash;
        setHash(hash);
    }, [params]);

    return hash;
}

export default useHashChange;
