'use client';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import useHashChange from '@/app/hooks/useHashChange';

type Props = {
    links: { attributes: { navlink: string; href: string }; id: number }[];
};
function NavigationLinks({ links }: Props) {
    const hash = useHashChange();
    const pathname = usePathname();

    return (
        <nav className="navigation-list">
            {links?.map((link) => {
                const isActive =
                    (pathname.endsWith(link.attributes.href) && hash === '') ||
                    hash.endsWith(link.attributes.href) ||
                    pathname.endsWith(link.attributes.href);
                return (
                    <NavLink
                        key={link.id}
                        active={isActive}
                        href={link.attributes.href}
                    >
                        {link.attributes.navlink}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default NavigationLinks;
