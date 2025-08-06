import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Plus, Minus, Phone } from 'lucide-react';
import { companyInfo } from '../data/company';

// Placeholder FAQs - to be replaced with the new ones user will provide
const faqs = [
  {
    question: 'How does your free consultation work?',
    answer: 'We\'ll schedule a convenient time to visit your home, measure your space, show flooring samples, and provide a detailed quote on the spot. The consultation typically takes 30-45 minutes, and there\'s absolutely no obligation.'
  },
  {
    question: 'What makes SupplySide different?',
    answer: 'Family-owned for over 80 years combined experience, we\'re not a big box store. Matt and Don personally oversee every project. We show up on time, protect your home, and guarantee our work for 5 years.'
  },
  {
    question: 'How long will my installation take?',
    answer: 'Most installations are completed in 1-3 days. We\'ll give you an exact timeline during your consultation. We work efficiently while maintaining precision, and we\'ll never leave your home unfinished overnight.'
  },
  {
    question: 'Do you handle everything?',
    answer: 'Yes! We move furniture, remove old flooring, handle disposal, and clean up completely. You literally don\'t have to do anything except choose your new floors and let us handle the rest.'
  },
  {
    question: 'What if I need to reschedule?',
    answer: 'Life happens! We\'re flexible with scheduling and understand plans change. Just give us 24 hours notice and we\'ll work with you to find a new date that fits your schedule.'
  },
  {
    question: 'How do I prepare for installation day?',
    answer: 'We\'ll provide a simple checklist during your consultation, but honestly, we handle most everything. Just remove small valuables and ensure we have clear pathways. We\'ll take care of the rest.'
  },
  {
    question: 'What happens after installation?',
    answer: 'We\'ll walk through everything with you, ensure you\'re 100% satisfied, and provide care instructions. You\'ll have our direct number for any questions. Plus, our commitment to expert craftsmanship means we\'re always here if you need us.'
  },
  {
    question: 'Why should I trust SupplySide with my home?',
    answer: 'We\'re licensed, insured, and have installed flooring in over 1,000 Chicago homes. We treat every home like it\'s our own. Check our reviews - our customers become friends who recommend us to their neighbors.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | SupplySide Flooring Chicago</title>
        <meta 
          name="description" 
          content="Get answers to common questions about flooring installation in Chicago. Learn about our process, pricing, timeline, and guarantees. Call 312-210-0606 for more info." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-inter font-bold text-deep-charcoal mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-medium-gray mb-8">
              Everything you need to know about our flooring services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#faq-list"
                className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
              >
                Browse FAQs
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="border-2 border-burnt-sienna text-burnt-sienna px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-burnt-sienna hover:text-crisp-white transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us: {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section id="faq-list" className="py-20 md:py-24 bg-crisp-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-2">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-light-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-medium-gray mb-8 max-w-2xl mx-auto">
            Our team is here to help. Get personalized answers about your specific flooring project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#hero-form"
              className="bg-burnt-sienna text-crisp-white px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-opacity-90 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Free Estimate
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className="border-2 border-burnt-sienna text-burnt-sienna px-6 py-2.5 rounded-md font-inter font-medium text-base hover:bg-burnt-sienna hover:text-crisp-white transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now: {companyInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}