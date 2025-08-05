export default function GoogleMap() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-deep-navy mb-8 text-center uppercase tracking-wider">
            Service Area
          </h2>
          <p className="text-xl text-cool-gray text-center mb-8 font-light">
            Proudly serving Chicago and surrounding suburbs
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.33858294147!2d-87.87204703418557!3d41.83390367061417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1704240000000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SupplySide Flooring Service Area - Chicago"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-cool-gray mb-4">
              We serve all of Chicago and the following suburbs:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                'Oak Park', 'Evanston', 'Skokie', 'Naperville',
                'Arlington Heights', 'Schaumburg', 'Orland Park', 'Tinley Park',
                'Berwyn', 'Cicero', 'Des Plaines', 'Mount Prospect',
                'Palatine', 'Hoffman Estates', 'Bolingbrook', 'Downers Grove'
              ].map((area) => (
                <span key={area} className="text-cool-gray font-light">
                  • {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}