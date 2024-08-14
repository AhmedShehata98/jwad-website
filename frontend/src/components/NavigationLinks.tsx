'use client';
import NavLink from './NavLink';
import useHashChange from '@/app/hooks/useHashChange';

type Props = {
    links: { attributes: { navlink: string; href: string }; id: number }[];
};
function NavigationLinks({ links }: Props) {
    const hash = useHashChange();

    return (
        <nav className="navigation-list">
            {links?.map((link) => {
                const isActive =
                    (link.attributes.href === '/' && hash === '') ||
                    hash.endsWith(link.attributes.href);
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
