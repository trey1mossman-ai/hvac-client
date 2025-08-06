import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`bg-crisp-white rounded-lg overflow-hidden transition-all duration-300 ${
            openIndex === index ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
          >
            <h3 className="font-inter font-medium text-deep-charcoal pr-4">
              {faq.question}
            </h3>
            <div
              className={`transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-burnt-sienna" />
              ) : (
                <Plus className="w-5 h-5 text-burnt-sienna" />
              )}
            </div>
          </button>
          
          <div
            className={`px-6 transition-all duration-300 ease-in-out ${
              openIndex === index
                ? 'max-h-96 py-5 border-t border-gray-100'
                : 'max-h-0'
            }`}
          >
            <p className="text-medium-gray font-light leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}