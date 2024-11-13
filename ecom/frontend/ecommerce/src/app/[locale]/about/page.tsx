import { FC } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const page: FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Company Overview */}
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600">
            Welcome to our e-commerce platform! Established in Nepal, we aim to connect customers with quality products and exceptional service. Our goal is to make shopping convenient, affordable, and enjoyable for everyone in Nepal.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to empower communities in Nepal by providing an accessible online marketplace for locally-sourced products as well as popular international brands. We are committed to delivering value through a seamless and user-friendly shopping experience.
          </p>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Customer Satisfaction: Placing customer needs at the core of our business.</li>
            <li>Integrity: Operating transparently and ethically in all our interactions.</li>
            <li>Innovation: Continuously improving our platform to meet evolving customer needs.</li>
            <li>Community Support: Supporting and promoting local businesses in Nepal.</li>
          </ul>
        </section>

        {/* Meet the Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
          <p className="text-gray-600 mb-8">
            Our team is a diverse group of passionate individuals dedicated to creating the best shopping experience for our customers. From customer support to logistics, every member plays a vital role in our success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/images/teammember.png" alt="Team Member" className="w-40 md:w-96 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Sujit Ram Dhakal</h3>
              <p className="text-gray-500 mb-2">Developer</p>
              <div className="flex items-center justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-800 hover:text-gray-900">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/images/teammember.png" alt="Team Member" className="w-40 md:w-96 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Manish Balami</h3>
              <p className="text-gray-500 mb-2">Developer</p>
              <div className="flex items-center justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-800 hover:text-gray-900">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <img src="/images/teammember.png" alt="Team Member" className="w-40 md:w-96 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">Rujen Basnet</h3>
              <p className="text-gray-500 mb-3">Ui/Ux Developer</p>
              <div className="flex items-center justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-700">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-800 hover:text-gray-900">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Responsibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Social Responsibility</h2>
          <p className="text-gray-600">
            We believe in giving back to the community. Our business supports various social causes, including environmental sustainability and education programs in Nepal. Through our efforts, we aim to make a positive impact on the lives of people around us.
          </p>
        </section>

        {/* Social Media Links */}
        <div className="text-center mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect with Us</h2>
          <div className="flex items-center justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-700">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
