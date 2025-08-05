import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What flooring is best for Chicago homes?',
    answer: 'For Chicago\'s climate, we recommend waterproof luxury vinyl for basements, porcelain tile for entryways and bathrooms, and engineered hardwood for main living areas. Each handles our temperature and humidity changes well.'
  },
  {
    question: 'How much does flooring installation cost?',
    answer: 'Costs vary by material and project size. Vinyl starts around $2.99/sq ft, laminate from $3.49/sq ft, and hardwood from $6.99/sq ft installed. We provide free, detailed quotes with no hidden fees.'
  },
  {
    question: 'Do you offer financing?',
    answer: 'Yes! We offer 0% interest financing for 12 months with approved credit, plus longer-term options. Many projects can be completed for less than $100/month.'
  },
  {
    question: 'How long does installation take?',
    answer: 'Most homes are completed in 1-3 days. We work efficiently to minimize disruption while ensuring perfect installation. Larger projects or intricate patterns may take longer.'
  },
  {
    question: 'Do you move furniture and remove old flooring?',
    answer: 'Absolutely! Our full-service installation includes furniture moving, old flooring removal, and disposal. We handle everything so you don\'t have to lift a finger.'
  },
  {
    question: 'What warranty do you provide?',
    answer: 'We offer a 5-year installation warranty covering any installation-related issues. This is in addition to manufacturer warranties which typically range from 15-30 years.'
  },
  {
    question: 'Can you match flooring from big box stores?',
    answer: 'Yes! We can install flooring you\'ve purchased elsewhere, though we also offer competitive pricing on premium materials with better warranties than retail stores.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, we\'re fully licensed, bonded, and insured. We carry $2 million in liability insurance and all our installers are covered by workers\' compensation.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold text-center mb-12 text-deep-navy uppercase tracking-header">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-crisp-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-cream transition"
                >
                  <span className="font-bold text-deep-navy">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-olive-green" />
                  ) : (
                    <ChevronDown className="text-olive-green" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-sage/20 bg-cream">
                    <p className="text-cool-gray font-light">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}