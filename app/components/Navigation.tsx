"use client";

import React from 'react';

const navigationItems = [
    { label: "HOME", href: "#home" },
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "WORK WITH ME", href: "#work-with-me" },
    { label: "RESOURCES", href: "#resources" },
];

export const Navigation = (): React.ReactElement => {
    return (
        <nav 
            className="top-0 left-0 right-0 z-50 bg-[#750100] shadow-lg"
            aria-label="Primary navigation"
        >
            <div className="max-w-[1120px] mx-auto h-[48px] sm:h-[52px] md:h-[56px] lg:h-[64px] px-2 xs:px-3 sm:px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between h-full gap-2 xs:gap-3 sm:gap-4">
                    {/* Left Navigation Group - Gap doubled again */}
                    <div className="flex items-center gap-6 xs:gap-8 sm:gap-12 md:gap-18 lg:gap-24 xl:gap-30">
                        {navigationItems.slice(0, 2).map((item) => (
                            <NavLink key={item.label} href={item.href} label={item.label} />
                        ))}
                    </div>

                    {/* Minimal spacer */}
                    <div className="flex-1 min-w-0"></div>

                    {/* Right Navigation Group - Gap doubled again */}
                    <div className="flex items-center gap-6 xs:gap-8 sm:gap-12 md:gap-18 lg:gap-24 xl:gap-30">
                        {navigationItems.slice(2).map((item) => (
                            <NavLink key={item.label} href={item.href} label={item.label} />
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// Reusable NavLink Component with mobile-friendly sizing
const NavLink = ({ href, label }: { href: string; label: string }) => (
    <a
        href={href}
        className="relative font-['Josefin_Sans',Helvetica] text-[10px] xs:text-xs sm:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] whitespace-nowrap
        transition-all duration-300 ease-in-out
        hover:opacity-80 hover:scale-105
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee]
        after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] sm:after:h-[1.5px] after:bg-[#f7f3ee]
        after:transition-all after:duration-300 hover:after:w-full
        [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]"
    >
        {label}
    </a>
);