"use client";

import React from 'react';

const footerLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "WORK WITH ME", href: "#work-with-me" },
    { label: "CONTACT US", href: "#contact" },
];

export const Footer = (): React.ReactElement => {
    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className="w-full bg-[#5B0706] border-t border-[#8a1a1a]"
            aria-label="Footer navigation"
        >
            <div className="max-w-[1440px] mx-auto h-[56px] sm:h-[60px] md:h-[64px] lg:h-[72px] px-2 xs:px-3 sm:px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between h-full gap-2 xs:gap-3 sm:gap-4">
                    {/* Left - Logo */}
                    <div className="flex items-center shrink-0">
                        <span className="font-['Josefin_Sans',Helvetica] text-[10px] xs:text-xs sm:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] tracking-wide">
                            FRANCESCA
                        </span>
                    </div>

                    {/* Center - Navigation Links */}
                    <div className="flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-14 xl:gap-18">
                        {footerLinks.map((link) => (
                            <FooterLink key={link.label} href={link.href} label={link.label} />
                        ))}
                    </div>

                    {/* Right - Copyright */}
                    <div className="flex items-center shrink-0">
                        <span className="font-['Josefin_Sans',Helvetica] text-[10px] xs:text-xs sm:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] whitespace-nowrap">
                            {currentYear} ALL RIGHTS RESERVED
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Reusable FooterLink Component
const FooterLink = ({ href, label }: { href: string; label: string }) => (
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