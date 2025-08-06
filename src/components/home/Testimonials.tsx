import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-crisp-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-charcoal mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base text-medium-gray font-light">
            Over 1,000 satisfied customers across Chicagoland
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto testimonials-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-crisp-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 testimonial-card h-full flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-dusty-gold text-dusty-gold"
                  />
                ))}
              </div>
              <p className="text-medium-gray mb-6 italic font-light leading-relaxed flex-grow line-clamp-4">"{testimonial.review}"</p>
              <div className="border-t border-terracotta/20 pt-4 mt-auto">
                <p className="font-medium text-deep-charcoal">{testimonial.name}</p>
                <p className="text-sm text-medium-gray">{testimonial.location}</p>
                <p className="text-sm text-burnt-sienna mt-2 font-medium">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}