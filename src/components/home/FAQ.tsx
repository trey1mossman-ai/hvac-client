import FAQAccordion from '../common/FAQAccordion';

const faqs = [
  {
    question: 'What flooring is best for Chicago homes?',
    answer: 'For Chicago\'s climate, we recommend waterproof luxury vinyl for basements, porcelain tile for entryways and bathrooms, and engineered hardwood for main living areas. Each handles our temperature and humidity changes well.'
  },
  {
    question: 'How do I get an accurate quote?',
    answer: 'We provide free in-home consultations where we measure your space, discuss material options, and provide a detailed quote. Every project is unique, so we customize our quotes to your specific needs.'
  },
  {
    question: 'Do you offer financing?',
    answer: 'Yes! We offer flexible financing options with approved credit, including 0% interest plans. We\'ll discuss all available payment options during your consultation.'
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
    question: 'Can you install flooring I purchase elsewhere?',
    answer: 'Yes! We can install flooring you\'ve purchased from other suppliers. We also offer a wide selection of premium materials with excellent manufacturer warranties.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, we\'re fully licensed, bonded, and insured with comprehensive liability coverage. All our installers are covered by workers\' compensation for your protection.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-inter font-medium text-center mb-16 text-deep-navy">
            Frequently Asked Questions
          </h2>
          
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}