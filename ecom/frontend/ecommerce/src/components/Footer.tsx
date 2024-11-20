import { FC } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className="bg-black text-[#FAFAFA] py-10 mt-24">
      <div className="container mx-auto px-2 sm:px-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-8">

        {/* Company Information */}
        <div>
          <h3 className="text-xl font-bold">EcomNEPAL</h3>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3">
            <li>Schoolroad Hetauda, Nepal.</li>
            <li>ecomnepal@gmail.com</li>
            <li>+977-1234567890</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-gray-400">My Account</a></li>
            <li><a href="#" className="hover:text-gray-400">Login / Register</a></li>
            <li><a href="#" className="hover:text-gray-400">Cart</a></li>
            <li><a href="#" className="hover:text-gray-400">Shop</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-400">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            <li className="flex space-x-3">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-600">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-500">
                <FaTwitter size={24} />
              </a>
            </li>
          </ul>
        </div>
       
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-base text-[#FAFAFA]">
        © Copyright {new Date().getFullYear()} EcomNEPAL. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
