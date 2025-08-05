import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-deep-navy mb-4 uppercase tracking-wider">
            What Our Customers Say
          </h2>
          <p className="text-xl text-cool-gray font-light">
            Over 1,000 satisfied customers across Chicagoland
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-crisp-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300"
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
              <p className="text-cool-gray mb-4 italic font-light">"{testimonial.review}"</p>
              <div className="border-t border-sage/20 pt-4">
                <p className="font-bold text-deep-navy">{testimonial.name}</p>
                <p className="text-sm text-cool-gray">{testimonial.location}</p>
                <p className="text-sm text-olive-green mt-1 font-semibold">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}