import { Shield, Users, Award, Clock } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-soft-taupe">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-inter font-medium text-center mb-16 text-deep-navy">
            About SupplySide Flooring
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-lg font-inter font-medium text-deep-navy mb-6">
                Chicago's Most Reliable Flooring Installers
              </h3>
              <p className="text-cool-gray mb-6 font-light leading-relaxed">
                For over 80 years combined, Matt and Don have been transforming Chicago homes and businesses 
                with quality flooring installations. As a family-owned business, we treat every project 
                like it's our own home.
              </p>
              <p className="text-cool-gray mb-6 font-light leading-relaxed">
                We've built our reputation on three simple principles: show up on time, do what we say 
                we'll do, and deliver exceptional results. It's why property managers, contractors, and 
                homeowners consistently choose SupplySide for their flooring needs.
              </p>
              <div className="flex items-center gap-4 text-warm-wood font-medium mt-8">
                <img 
                  src="/images/about/team-photo.webp"
                  alt="Matt and Don"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="text-deep-navy font-medium">Matt & Don</p>
                  <p className="text-sm">Founders & Master Installers</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-crisp-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <Users className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-inter font-medium text-deep-navy mb-2">Family Owned</h4>
                <p className="text-cool-gray text-sm">Treating your home like our own</p>
              </div>
              <div className="bg-crisp-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <Clock className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-inter font-medium text-deep-navy mb-2">80+ Years</h4>
                <p className="text-cool-gray text-sm">Combined experience</p>
              </div>
              <div className="bg-crisp-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <Shield className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-inter font-medium text-deep-navy mb-2">Fully Insured</h4>
                <p className="text-cool-gray text-sm">Licensed & bonded</p>
              </div>
              <div className="bg-crisp-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <Award className="w-12 h-12 text-olive-green mx-auto mb-3" />
                <h4 className="font-inter font-medium text-deep-navy mb-2">5-Star Rated</h4>
                <p className="text-cool-gray text-sm">1000+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}