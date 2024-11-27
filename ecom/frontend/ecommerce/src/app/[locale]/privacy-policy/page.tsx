import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        At EcomNEPAL, we are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you visit our website or use our services. Please read
        this policy carefully to understand our practices regarding your
        personal information.
      </p>

      <div className="space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect both personal and non-personal information to provide
            and improve our services.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              **Personal Information**: Name, email address, phone number,
              billing and shipping address, and payment details.
            </li>
            <li>
              **Non-Personal Information**: Browser type, device information,
              IP address, and usage data collected through cookies and similar
              technologies.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600">
            The information we collect is used for the following purposes:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>Processing and fulfilling your orders.</li>
            <li>Providing customer support and responding to inquiries.</li>
            <li>Improving our website and services.</li>
            <li>Sending promotional emails and offers (with your consent).</li>
            <li>Ensuring website security and fraud prevention.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Share Your Information
          </h2>
          <p className="text-gray-600">
            We do not sell your personal information to third parties. However,
            we may share your information with:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>
              **Service Providers**: Payment processors, shipping companies,
              and other third parties that help us provide our services.
            </li>
            <li>
              **Legal Authorities**: When required by law or to protect our
              rights and comply with legal obligations.
            </li>
            <li>
              **Business Transfers**: In the event of a merger, sale, or
              acquisition, your information may be transferred to the new
              entity.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
          <p className="text-gray-600">
            We use cookies and similar technologies to enhance your browsing
            experience, analyze website traffic, and personalize content. You
            can manage your cookie preferences in your browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to
            safeguard your personal information from unauthorized access,
            disclosure, alteration, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal
            information. To exercise these rights, please contact us using the
            information below.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the effective date will be updated
            accordingly. Please review this page periodically for updates.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <ul className="mt-2 text-gray-600">
            <li>Address: Schoolroad, Hetauda, Nepal</li>
            <li>
              Email:{" "}
              <a
                href="mailto:ecomnepal@gmail.com"
                className="text-blue-500 hover:underline"
              >
                ecomnepal@gmail.com
              </a>
            </li>
            <li>Phone: +977-1234567890</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
