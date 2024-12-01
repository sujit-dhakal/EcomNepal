import React from 'react';
import { useLocale } from 'next-intl';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Footer: React.FC = () => {
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = {
    support: [
      { label: "Schoolroad Hetauda, Nepal." },
      { label: "ecomnepal@gmail.com" },
      { label: "+977-1234567890" },
    ],
    account: [
      { label: "My Account", href: `/${locale}/profile` },
      { label: "Login / Register", href: `/${locale}/accounts/login` },
      { label: "Cart", href: `/${locale}/cart` },
      { label: "Shop", href: `/${locale}` },
    ],
    quickLinks: [
      { label: "Privacy Policy", href: `/${locale}/privacy-policy` },
      { label: "Terms Of Use", href: `/${locale}/terms-of-use` },
      { label: "FAQ", href: `/${locale}/faq` },
      { label: "Contact", href: `/${locale}/contact` },
    ],
    socials: [
      { icon: <FaFacebook size={24} />, href: "#", color: "text-blue-500 hover:text-blue-600" },
      { icon: <FaInstagram size={24} />, href: "#", color: "text-pink-500 hover:text-pink-600" },
      { icon: <FaTwitter size={24} />, href: "#", color: "text-blue-400 hover:text-blue-500" },
    ],
  };

  const renderLinks = (items: { label: string; href?: string }[]) =>
    items.map((item, index) => (
      <li key={index}>
        {item.href ? (
          <Link href={item.href} className="hover:text-gray-400">
            {item.label}
          </Link>
        ) : (
          item.label
        )}
      </li>
    ));

  return (
    <footer className="bg-black text-[#FAFAFA] py-10 mt-24">
      <div className="container mx-auto px-2 sm:px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-8">
        <div>
          <h3 className="text-xl font-bold">EcomNEPAL</h3>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3">{renderLinks(links.support)}</ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-3">{renderLinks(links.account)}</ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {renderLinks(links.quickLinks)}
            <li className="flex space-x-3">
              {links.socials.map((social, index) => (
                <Link key={index} href={social.href} className={social.color}>
                  {social.icon}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-base text-[#FAFAFA]">
        © {year} EcomNEPAL. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
