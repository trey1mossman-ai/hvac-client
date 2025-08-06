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
    <div className="space-y-2 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 last:border-0 transition-all duration-300"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full py-6 text-left flex justify-between items-center group hover:text-burnt-sienna transition-colors duration-200"
          >
            <h3 className="font-inter font-normal text-lg text-deep-charcoal group-hover:text-burnt-sienna pr-4 transition-colors">
              {faq.question}
            </h3>
            <div
              className={`transition-all duration-300 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            >
              {openIndex === index ? (
                <Minus className="w-4 h-4 text-burnt-sienna" />
              ) : (
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-burnt-sienna transition-colors" />
              )}
            </div>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index
                ? 'max-h-96 pb-6'
                : 'max-h-0'
            }`}
          >
            <p className="text-gray-600 font-light leading-relaxed text-base">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}