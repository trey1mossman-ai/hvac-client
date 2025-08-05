export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFAQs {
  serviceId: string;
  faqs: FAQ[];
}

export const serviceFAQs: ServiceFAQs[] = [
  {
    serviceId: 'vinyl',
    faqs: [
      {
        question: 'Is luxury vinyl flooring waterproof?',
        answer: 'Yes! Luxury vinyl plank and tile are 100% waterproof, making them perfect for Chicago basements, kitchens, and bathrooms where moisture is a concern.'
      },
      {
        question: 'How long does vinyl flooring last?',
        answer: 'Quality luxury vinyl flooring typically lasts 20-30 years with proper care. Our professional installation ensures maximum lifespan for your investment.'
      },
      {
        question: 'Can vinyl flooring be installed over existing floors?',
        answer: 'In many cases, yes! We can install vinyl over existing tile, concrete, or hardwood if the subfloor is level and in good condition. We\'ll assess during your free consultation.'
      },
      {
        question: 'Is vinyl flooring good for pets?',
        answer: 'Absolutely! Vinyl flooring is scratch-resistant, waterproof, and easy to clean, making it ideal for homes with pets. It also provides better traction than hardwood.'
      },
      {
        question: 'What\'s the difference between LVP and LVT?',
        answer: 'LVP (Luxury Vinyl Plank) mimics hardwood with long planks, while LVT (Luxury Vinyl Tile) replicates stone or ceramic tiles. Both offer the same durability and water resistance.'
      }
    ]
  },
  {
    serviceId: 'tile',
    faqs: [
      {
        question: 'What type of tile is best for Chicago winters?',
        answer: 'Porcelain tile is ideal for Chicago homes as it\'s frost-resistant and handles temperature changes well. We also recommend heated flooring systems for added comfort.'
      },
      {
        question: 'How do I prevent grout from getting dirty?',
        answer: 'We use high-quality, stain-resistant grout and apply professional sealers. We\'ll also teach you proper maintenance techniques to keep your grout looking new.'
      },
      {
        question: 'Can you install heated floors under tile?',
        answer: 'Yes! Radiant floor heating is a popular option for tile installations, especially in bathrooms. It adds comfort and can help reduce heating costs.'
      },
      {
        question: 'How long does tile installation take?',
        answer: 'Most residential tile projects take 2-5 days depending on size and complexity. This includes subfloor prep, installation, grouting, and sealing.'
      },
      {
        question: 'Is tile flooring slippery when wet?',
        answer: 'We offer slip-resistant tile options perfect for bathrooms and entryways. Textured surfaces and proper installation ensure safety without sacrificing style.'
      }
    ]
  },
  {
    serviceId: 'hardwood',
    faqs: [
      {
        question: 'Should I choose solid or engineered hardwood?',
        answer: 'For Chicago\'s climate, engineered hardwood often performs better due to humidity changes. However, solid hardwood can be refinished more times. We\'ll help you choose based on your specific needs.'
      },
      {
        question: 'How do I maintain hardwood floors?',
        answer: 'Regular sweeping, occasional damp mopping with hardwood cleaner, and maintaining 30-50% humidity levels will keep your floors beautiful. We provide detailed care instructions.'
      },
      {
        question: 'Can hardwood be installed in basements?',
        answer: 'Engineered hardwood can be installed in basements with proper moisture barriers. Solid hardwood is not recommended below grade due to moisture concerns.'
      },
      {
        question: 'How often should hardwood be refinished?',
        answer: 'With proper care, hardwood floors typically need refinishing every 7-10 years. High-traffic areas may need attention sooner.'
      },
      {
        question: 'What\'s the most durable hardwood species?',
        answer: 'Oak, maple, and hickory are among the hardest domestic woods. Brazilian cherry and other exotic species offer extreme durability but at a higher cost.'
      }
    ]
  },
  {
    serviceId: 'carpet',
    faqs: [
      {
        question: 'What carpet is best for high-traffic areas?',
        answer: 'Low-pile, dense carpets with solution-dyed nylon or polyester fibers handle heavy traffic best. We\'ll recommend specific options based on your lifestyle.'
      },
      {
        question: 'How often should carpet be replaced?',
        answer: 'Quality carpet typically lasts 10-15 years with proper care. High-traffic areas may need replacement sooner, while bedrooms can last longer.'
      },
      {
        question: 'Can you install carpet over existing flooring?',
        answer: 'We can install carpet over many surfaces, but we always assess the subfloor first. Proper padding is crucial for comfort and longevity.'
      },
      {
        question: 'What\'s the best carpet for allergies?',
        answer: 'Low-pile carpets with tight weaves trap fewer allergens. We also offer hypoallergenic options and treatments to minimize allergen accumulation.'
      },
      {
        question: 'Do you move furniture for carpet installation?',
        answer: 'Yes! Our team includes furniture moving in our installation service. We carefully move and replace all furniture to protect your belongings.'
      }
    ]
  },
  {
    serviceId: 'laminate',
    faqs: [
      {
        question: 'Is laminate flooring water-resistant?',
        answer: 'Modern laminate flooring is water-resistant but not waterproof. It can handle spills if cleaned quickly but isn\'t ideal for areas with standing water.'
      },
      {
        question: 'Can laminate flooring be repaired if damaged?',
        answer: 'Individual planks can often be replaced without redoing the entire floor. We use click-lock systems that make repairs more manageable.'
      },
      {
        question: 'How does laminate compare to hardwood in cost?',
        answer: 'Laminate typically costs 50-70% less than hardwood, including installation. It offers the look of wood at a fraction of the price.'
      },
      {
        question: 'Is laminate flooring noisy?',
        answer: 'Quality underlayment significantly reduces noise. We always install proper sound-dampening underlayment to minimize sound transmission.'
      },
      {
        question: 'How long does laminate flooring last?',
        answer: 'With proper installation and care, quality laminate flooring lasts 15-25 years. Higher AC-rated laminates offer better durability.'
      }
    ]
  },
  {
    serviceId: 'refinishing',
    faqs: [
      {
        question: 'How do I know if my floors can be refinished?',
        answer: 'Solid hardwood can typically be refinished 4-6 times. Engineered wood depends on the veneer thickness. We\'ll assess your floors during our free consultation.'
      },
      {
        question: 'How long does refinishing take?',
        answer: 'Most homes take 3-5 days: 1-2 days for sanding, 1 day for staining, and 1-2 days for finish coats. You\'ll need to stay off floors during this time.'
      },
      {
        question: 'Is refinishing dusty and messy?',
        answer: 'We use dustless sanding systems that capture 99% of dust. While some dust is inevitable, our system minimizes mess and cleanup.'
      },
      {
        question: 'Can I change the color when refinishing?',
        answer: 'Absolutely! Refinishing is the perfect time to change your floor color. We offer dozens of stain options to match any décor.'
      },
      {
        question: 'What finish options are available?',
        answer: 'We offer oil-based polyurethane (traditional), water-based polyurethane (low VOC, faster drying), and penetrating oils. Each has different benefits we\'ll discuss.'
      }
    ]
  }
];

// Helper function to get FAQs for a specific service
export function getServiceFAQs(serviceId: string): FAQ[] {
  const serviceFAQ = serviceFAQs.find(sf => sf.serviceId === serviceId);
  return serviceFAQ?.faqs || [];
}