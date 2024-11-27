import React from "react";

const TermsOfUse: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Terms of Use</h1>
      <p className="text-gray-700 mb-6">
        Welcome to EcomNEPAL! By accessing or using our website, you agree to
        comply with and be bound by the following terms and conditions. Please
        read these terms carefully before using our services.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using our website, you agree to be legally bound by
            these Terms of Use and our Privacy Policy. If you do not agree to
            these terms, please do not use our services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We reserve the right to modify or update these terms at any time
            without prior notice. Your continued use of our website after any
            changes signifies your acceptance of the revised terms.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. User Responsibilities
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Provide accurate and truthful information when creating an account.</li>
            <li>Maintain the confidentiality of your account and password.</li>
            <li>Use the website in compliance with all applicable laws and regulations.</li>
            <li>Refrain from engaging in fraudulent, abusive, or illegal activities.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p className="text-gray-600">
            All content on this website, including text, images, logos, and
            graphics, is the property of EcomNEPAL and is protected by
            copyright, trademark, and other intellectual property laws. You may
            not use any content without prior written permission.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            EcomNEPAL is not liable for any direct, indirect, incidental,
            special, or consequential damages arising from your use of our
            website or services, including but not limited to data loss or
            unauthorized access.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to terminate or suspend your access to our
            website at any time, with or without cause or notice, for conduct
            that we believe violates these terms.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
          <p className="text-gray-600">
            These Terms of Use are governed by and construed in accordance with
            the laws of Nepal. Any disputes arising from these terms will be
            subject to the exclusive jurisdiction of the courts of Nepal.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Use, please contact
            us at:
          </p>
          <ul className="mt-2 text-gray-600">
            <li>Address: Schoolroad, Hetauda, Nepal</li>
            <li>Email: <a href="mailto:ecomnepal@gmail.com" className="text-blue-500 hover:underline">ecomnepal@gmail.com</a></li>
            <li>Phone: +977-1234567890</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
