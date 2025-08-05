import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-deep-navy mb-6">
            What Our Customers Say
          </h2>
          <p className="text-base text-cool-gray font-light">
            Over 1,000 satisfied customers across Chicagoland
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto testimonials-grid">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-crisp-white rounded-xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 testimonial-card"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-light-oak text-light-oak"
                  />
                ))}
              </div>
              <p className="text-cool-gray mb-6 italic font-light leading-relaxed">"{testimonial.review}"</p>
              <div className="border-t border-sage/20 pt-6">
                <p className="font-medium text-deep-navy">{testimonial.name}</p>
                <p className="text-sm text-cool-gray">{testimonial.location}</p>
                <p className="text-sm text-olive-green mt-2 font-medium">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}