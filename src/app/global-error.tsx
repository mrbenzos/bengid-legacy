'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-lg text-gray-700 mb-2">
            An unexpected error occurred on our end.
          </p>
          {error?.digest && (
            <p className="text-xs text-gray-400 mb-4">Error ID: {error.digest}</p>
          )}
          <button
            onClick={() => reset()}
            className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
