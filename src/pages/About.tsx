import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About SupplySide Flooring - Chicago's Trusted Flooring Installers</title>
        <meta name="description" content="Learn about SupplySide Flooring's 80+ years of experience serving Chicago with professional flooring installation services." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          About SupplySide Flooring
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            With over 80 years of combined experience, SupplySide Flooring has been Chicago's trusted choice for professional flooring installation.
          </p>
          <p className="text-lg">
            We pride ourselves on reliability, quality craftsmanship, and exceptional customer service.
          </p>
        </div>
      </div>
    </>
  )
}