// Simple contact page without useSearchParams
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-font-secondary dark:text-font-secondary-dark font-josefin">
            Get in touch with us
          </p>
        </div>
        
        <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
          <p className="text-font-secondary dark:text-font-secondary-dark">
            Contact form coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

