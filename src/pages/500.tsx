export default function Custom500() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f9fafb', padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#dc2626', marginBottom: '1rem' }}>500 – Server Error</h1>
      <p style={{ color: '#374151', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Something went wrong on our end.</p>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2rem' }}>Please try refreshing or contact support if the issue persists.</p>
      <a href="/" style={{ background: '#1e3a5f', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700, textDecoration: 'none' }}>Return Home</a>
    </main>
  );
}
