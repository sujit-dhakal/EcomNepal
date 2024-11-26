"use client";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  faqs: FAQItem[];
}

const FAQAccordion: React.FC = () => {
  const faqSections: FAQSection[] = [
    {
      title: "Orders",
      faqs: [
        {
          question: "How do I place an order?",
          answer:
            "To place an order, browse our products, add items to your cart, and proceed to checkout. Follow the instructions to complete your purchase.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "Orders can be modified or canceled within 24 hours of placement. Contact our support team for assistance.",
        },
      ],
    },
    {
      title: "Shipping",
      faqs: [
        {
          question: "What are the shipping options?",
          answer:
            "We offer standard, express, and overnight shipping. You can choose your preferred method at checkout.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order is shipped, you will receive a tracking number via email. Use this number to track your package on our shipping partner's website.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      faqs: [
        {
          question: "What is your return policy?",
          answer:
            "We accept returns within 30 days of delivery. Items must be unused and in their original packaging.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are processed within 5-7 business days after we receive and inspect your returned items.",
        },
      ],
    },
    {
      title: "Payments",
      faqs: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept credit cards, debit cards, PayPal, and other major payment methods. You can view all options at checkout.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption to protect your payment information.",
        },
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container md:w-[700px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      {faqSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="space-y-4">
            {section.faqs.map((faq, faqIndex) => {
              const index = sectionIndex * 100 + faqIndex;
              const isOpen = openIndex === index;

              return (
                <div
                  key={faqIndex}
                  className="border-b border-gray-300 pb-4"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full text-lg font-medium text-left"
                  >
                    {faq.question}
                    <span className="ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
