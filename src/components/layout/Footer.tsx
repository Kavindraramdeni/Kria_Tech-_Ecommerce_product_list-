import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants/contact';
import { FOOTER_LINKS } from '../../constants/navigation';

interface FooterProps {
  onNavigate: (page: string, anchor?: string) => void;
}

const Logo = () => (
    <div className="flex items-center space-x-3">
        <div className="bg-blue-600 text-white font-black text-base w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shadow-blue-500/10">
            KT
        </div>
        <div>
            <h2 className="text-lg font-black text-white tracking-tighter uppercase leading-tight">K ria<span className="text-blue-500">Tech</span></h2>
            <p className="text-[9px] font-extrabold text-gray-500 uppercase tracking-widest leading-none">Creative Fabrication</p>
        </div>
    </div>
);

const SocialIcon: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({ href, label, icon }) => (
    <motion.a 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={href} 
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200 border border-white/5 shadow-md"
    >
        <span className="sr-only">{label}</span>
        {icon}
    </motion.a>
);

const FooterLink: React.FC<{ children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ children, onClick }) => (
    <li>
        <a 
            href="#" 
            onClick={onClick} 
            className="text-gray-400 hover:text-blue-400 text-xs transition-all duration-200 inline-flex items-center group font-semibold py-1"
        >
            <ArrowRight size={11} className="mr-1.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
            {children}
        </a>
    </li>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, page: string, anchor?: string) => {
        e.preventDefault();
        onNavigate(page, anchor);
    };

    return (
        <footer className="bg-gray-950 text-gray-400 border-t border-white/5 relative z-10">
            <div className="container mx-auto py-10 md:py-14 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    
                    {/* Column 1: Brand & Socials */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-500 text-xs leading-relaxed max-w-sm font-semibold">
                            Crafting premium wall decor and bespoke interior installations that redefine modern spaces. Elevating your environment with precision craftsmanship and artistic vision.
                        </p>
                        <div className="flex space-x-2 pt-1">
                            <SocialIcon href={SOCIAL_LINKS.youtube} label="YouTube" icon={<Youtube size={16} />} />
                            <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram" icon={<Instagram size={16} />} />
                        </div>
                    </div>

                    {/* Column 2 & 3: Services & Quick Links (Side by side on mobile) */}
                    <div className="grid grid-cols-2 gap-4 md:contents">
                        <div>
                            <h3 className="text-[10px] font-black text-white tracking-widest uppercase mb-4">Our Services</h3>
                            <ul className="space-y-1.5">
                                {FOOTER_LINKS.services.map(link => (
                                    <FooterLink key={link.label} onClick={(e) => handleNavigate(e, link.href as any)}>{link.label}</FooterLink>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-black text-white tracking-widest uppercase mb-4">Quick Links</h3>
                            <ul className="space-y-1.5">
                                {FOOTER_LINKS.quickLinks.map(link => (
                                    <FooterLink key={link.label} onClick={(e) => handleNavigate(e, link.href as any, link.anchor)}>{link.label}</FooterLink>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="text-[10px] font-black text-white tracking-widest uppercase mb-4">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-xs group">
                                <div className="p-2 bg-gray-900 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                                    <Phone size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 leading-none mb-1">Phone</span>
                                    <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-gray-300 hover:text-blue-400 font-bold transition-colors leading-none">{CONTACT_INFO.phone}</a>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3 text-xs group">
                                <div className="p-2 bg-gray-900 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                                    <Mail size={14} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 leading-none mb-1">Email</span>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 hover:text-blue-400 font-bold transition-colors leading-none">{CONTACT_INFO.email}</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-black/45 border-t border-white/5 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <p className="text-gray-600 text-center sm:text-left">&copy; {new Date().getFullYear()} KriaTech. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link to="/privacy-policy" className="text-gray-600 hover:text-white transition-colors flex items-center gap-1.5">
                            Privacy Policy <ExternalLink size={10} />
                        </Link>
                        <Link to="/terms-of-service" className="text-gray-600 hover:text-white transition-colors flex items-center gap-1.5">
                            Terms of Service <ExternalLink size={10} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
