import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import ContactForm from '../components/common/ContactForm';
import GoogleMap from '../components/common/GoogleMap';
import { localBusinessSchema } from '../data/company';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>SupplySide Flooring Chicago | Most Reliable Flooring Installation</title>
        <meta 
          name="description" 
          content="Chicago's most reliable flooring installation company. 80+ years experience installing tile, hardwood, luxury vinyl, and more. Licensed & insured. Free quotes: 312-210-0606" 
        />
        <meta property="og:title" content="SupplySide Flooring Chicago | Professional Installation" />
        <meta property="og:description" content="Chicago's most reliable flooring installation. 80+ years experience. Free quotes." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <Hero />
      <Services />
      <About />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <GoogleMap />
    </>
  );
}