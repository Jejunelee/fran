"use client";

import React from 'react';

const footerLinks = [
    { label: "ABOUT ME", href: "/aboutme" },
    { label: "WORK WITH ME", href: "/workwithme" },
    { label: "CONTACT US", href: "/contact" },
];

export const Footer = (): React.ReactElement => {
    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className="w-full bg-[#5B0706] border-t border-[#8a1a1a]"
            aria-label="Footer navigation"
        >
            <div className="max-w-[1440px] mx-auto min-h-[56px] sm:h-[60px] md:h-[64px] lg:h-[72px] px-4 sm:px-4 lg:px-8 xl:px-12 py-4 sm:py-0">
                <div className="flex flex-col sm:flex-row items-center justify-between h-full gap-3 sm:gap-4">
                    {/* Left - Logo */}
                    <div className="flex items-center shrink-0">
                        <span className="font-['Josefin_Sans',Helvetica] max-sm:!text-[0.8125rem] max-sm:tracking-[0.16em] sm:max-md:!text-[0.9rem] md:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] sm:tracking-wide">
                            FRANCESCA
                        </span>
                    </div>

                    {/* Center - Navigation Links */}
                    <nav className="flex w-full items-center justify-evenly flex-nowrap gap-3 sm:w-auto sm:justify-center sm:flex-wrap sm:gap-8 md:gap-10 lg:gap-14 xl:gap-16 min-w-0" aria-label="Footer links">
                        {footerLinks.map((link) => (
                            <FooterLink key={link.label} href={link.href} label={link.label} />
                        ))}
                    </nav>

                    {/* Right - Copyright */}
                    <div className="flex items-center shrink-0">
                        <span className="font-['Josefin_Sans',Helvetica] max-sm:!text-[10px] max-sm:tracking-[0.14em] sm:max-md:!text-[0.9rem] md:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] whitespace-nowrap text-center">
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
        className="relative inline-flex min-h-11 items-center font-['Josefin_Sans',Helvetica] max-sm:!text-[12px] max-sm:tracking-[0.04em] sm:max-md:!text-[0.9rem] md:min-h-0 md:text-sm lg:text-base xl:text-lg font-normal text-[#f7f3ee] whitespace-nowrap
        transition-all duration-300 ease-in-out
        hover:opacity-80 hover:scale-105
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7f3ee]
        after:content-[''] after:absolute after:left-0 after:bottom-[10px] sm:after:bottom-[-2px] after:w-0 after:h-[1px] sm:after:h-[1.5px] after:bg-[#f7f3ee]
        after:transition-all after:duration-300 hover:after:w-full
        [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]"
    >
        {label}
    </a>
);