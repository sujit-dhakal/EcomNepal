import Button from '@/components/Button';
import { FC } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const page: FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">We’d love to hear from you! Reach out with any questions, concerns, or feedback.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Address</h2>
              <p className="flex items-center text-gray-700 mb-2">
                <FaMapMarkerAlt className="mr-2 text-[#DB4444]" />
                Hetauda, Makwanpur, Nepal
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaPhone className="mr-2 text-[#DB4444]" />
                +977-1234567890
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <FaEnvelope className="mr-2 text-[#DB4444]" />
                contact@ecomnepal.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-2 w-full p-2 bg-[#F5F5F5] rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="mt-2 w-full p-2 bg-[#F5F5F5] rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="mt-2 w-full p-2 bg-[#F5F5F5] rounded"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  className="mt-2 w-full p-2 bg-[#F5F5F5] rounded h-24"
                >
                </textarea>
              </div>
              <Button text="Send Message" className="w-56 h-14 text-[16px]" />
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default page;
