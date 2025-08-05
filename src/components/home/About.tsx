import { Shield, Users, Award, Clock } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-deep-navy uppercase tracking-wider">
            About SupplySide Flooring
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-deep-navy mb-4 uppercase">
                Chicago's Most Reliable Flooring Installers
              </h3>
              <p className="text-cool-gray mb-6 font-light text-lg">
                For over 80 years combined, Matt and Don have been transforming Chicago homes and businesses 
                with quality flooring installations. As a family-owned business, we treat every project 
                like it's our own home.
              </p>
              <p className="text-cool-gray mb-6 font-light text-lg">
                We've built our reputation on three simple principles: show up on time, do what we say 
                we'll do, and deliver exceptional results. It's why property managers, contractors, and 
                homeowners consistently choose SupplySide for their flooring needs.
              </p>
              <div className="flex items-center gap-4 text-warm-wood font-semibold">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop"
                  alt="Matt and Don"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="text-deep-navy font-bold">Matt & Don</p>
                  <p className="text-sm">Founders & Master Installers</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-crisp-white p-6 rounded-lg text-center">
                <Users className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-bold text-deep-navy mb-2">Family Owned</h4>
                <p className="text-cool-gray text-sm">Treating your home like our own</p>
              </div>
              <div className="bg-crisp-white p-6 rounded-lg text-center">
                <Clock className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-bold text-deep-navy mb-2">80+ Years</h4>
                <p className="text-cool-gray text-sm">Combined experience</p>
              </div>
              <div className="bg-crisp-white p-6 rounded-lg text-center">
                <Shield className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-bold text-deep-navy mb-2">Fully Insured</h4>
                <p className="text-cool-gray text-sm">Licensed & bonded</p>
              </div>
              <div className="bg-crisp-white p-6 rounded-lg text-center">
                <Award className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-bold text-deep-navy mb-2">5-Star Rated</h4>
                <p className="text-cool-gray text-sm">1000+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}