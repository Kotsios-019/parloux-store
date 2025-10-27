// Force dynamic rendering to avoid useSearchParams issues
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="heading-primary mb-4">404</h1>
        <p className="body-large mb-8">Page not found</p>
        <a href="/" className="btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
}
