import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How long does flooring installation take?',
    answer: 'Most residential projects take 1-3 days depending on the size and type of flooring. We\'ll provide a detailed timeline during your free consultation.'
  },
  {
    question: 'Do you offer financing?',
    answer: 'Yes, we offer flexible financing options through our partners. We can discuss payment plans during your consultation.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely! We\'re fully licensed, bonded, and insured. We\'re happy to provide documentation upon request.'
  },
  {
    question: 'Do you remove old flooring?',
    answer: 'Yes, we handle complete removal and disposal of your old flooring. This service is included in our quotes.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve Chicago and surrounding suburbs including Oak Park, Evanston, Skokie, Naperville, and more. Call to confirm we serve your area.'
  },
  {
    question: 'Do you offer warranties?',
    answer: 'Yes! We provide a 5-year installation warranty on all our work, plus manufacturer warranties on materials.'
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