export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#8d2831' }}>
          <h1 className="text-6xl font-heading font-bold text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-100 mb-6">
            Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
          <a
            href="/"
            style={{ backgroundColor: '#1e2f2c' }}
            className="inline-block py-3 px-6 text-base font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  )
}
