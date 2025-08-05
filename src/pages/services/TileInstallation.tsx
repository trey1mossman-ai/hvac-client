import { Helmet } from 'react-helmet-async'

export default function TileInstallation() {
  return (
    <>
      <Helmet>
        <title>Tile Installation Chicago - SupplySide Flooring</title>
        <meta name="description" content="Professional tile installation in Chicago. Ceramic, porcelain, and natural stone. Licensed & insured. Free quotes: 312-210-0606" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Professional Tile Installation in Chicago
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Transform your space with our expert tile installation services. We specialize in ceramic, porcelain, and natural stone installations.
          </p>
          <div className="text-center mt-8">
            <a
              href="tel:3122100606"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              Get Your Free Quote: 312-210-0606
            </a>
          </div>
        </div>
      </div>
    </>
  )
}