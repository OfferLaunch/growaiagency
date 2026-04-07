import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    // Determine active link from current path
    const getActiveHref = () => {
        if (typeof window === 'undefined') return '/';
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(Boolean);
        const fileName = pathSegments[pathSegments.length - 1] || '';

        // Blog posts should show "Resources" as active
        if (fileName.startsWith('blog-') || pathSegments[0] === 'blog') {
            return '/resources';
        }
        // Case studies
        if (
            currentPath === '/case-studies' ||
            currentPath === '/case-studies/' ||
            pathSegments[0] === 'case-studies' ||
            fileName.startsWith('case-study-')
        ) {
            return '/case-studies/';
        }
        // Home page
        if (
            currentPath === '/' ||
            currentPath === '/index.html' ||
            fileName === 'index.html' ||
            fileName === ''
        ) {
            return '/';
        }
        // Other pages
        if (pathSegments.length > 0) {
            const segment = pathSegments[0].replace('.html', '');
            return '/' + segment;
        }
        return '/';
    };

    const activeHref = getActiveHref();

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Process', href: '/process' },
        { label: 'AI Software', href: '/software' },
        { label: 'Resources', href: '/resources' },
        { label: 'Case Studies', href: '/case-studies/' },
        { label: 'About Us', href: '/about' },
    ];

    // Generate CTA URL with page tracking
    const getCtaUrl = () => {
        if (typeof window === 'undefined') return 'https://go.growaiagency.io/w-app';
        const pageName = window.location.pathname.split('/').pop()?.replace('.html', '') || 'index';
        return `https://go.growaiagency.io/w-app?utm_source=Website&utm_medium=web&utm_content=${pageName}&el=Website-${pageName}`;
    };

    const isLinkActive = (href: string) => {
        if (href === '/') {
            return activeHref === '/';
        }
        return activeHref === href || activeHref.startsWith(href);
    };

    return (
        <header
            className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
                'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
                    scrolled,
            })}
        >
            <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <a href="/" className="hover:bg-accent rounded-md p-1 transition-colors">
                        <img
                            src="/assets/images/logos/white%20and%20green.png"
                            alt="Grow AI"
                            className="h-6"
                        />
                    </a>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {navLinks.map((link) => (
                                <NavigationMenuLink key={link.href} asChild>
                                    <a
                                        href={link.href}
                                        className={cn(
                                            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                                            isLinkActive(link.href)
                                                ? 'bg-accent text-accent-foreground'
                                                : 'hover:bg-accent hover:text-accent-foreground',
                                        )}
                                    >
                                        {link.label}
                                    </a>
                                </NavigationMenuLink>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                    <Button asChild>
                        <a href={getCtaUrl()}>Get in Touch</a>
                    </Button>
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>
            <MobileMenu open={open}>
                <div className="flex flex-col gap-y-2 pb-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                                isLinkActive(link.href)
                                    ? 'bg-accent text-accent-foreground'
                                    : 'hover:bg-accent hover:text-accent-foreground',
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                    <Button asChild className="w-full">
                        <a href={getCtaUrl()}>Get in Touch</a>
                    </Button>
                </div>
            </MobileMenu>
        </header>
    );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
    open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className={cn(
                'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
                'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
            )}
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className={cn(
                    'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
                    'size-full p-4 flex flex-col justify-between',
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

function useScroll(threshold: number) {
    const [scrolled, setScrolled] = React.useState(false);

    const onScroll = React.useCallback(() => {
        setScrolled(window.scrollY > threshold);
    }, [threshold]);

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    // also check on first load
    React.useEffect(() => {
        onScroll();
    }, [onScroll]);

    return scrolled;
}
