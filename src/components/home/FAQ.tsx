import FAQAccordion from '../common/FAQAccordion';

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
    answer: 'We\'ll walk through everything with you, ensure you\'re 100% satisfied, and provide care instructions. You\'ll have our direct number for any questions. Plus, our 5-year warranty means we\'re always here if you need us.'
  },
  {
    question: 'Why should I trust SupplySide with my home?',
    answer: 'We\'re licensed, insured, and have installed flooring in over 1,000 Chicago homes. We treat every home like it\'s our own. Check our reviews - our customers become friends who recommend us to their neighbors.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-center mb-16 text-deep-charcoal">
            Frequently Asked Questions
          </h2>
          
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </section>
  );
}