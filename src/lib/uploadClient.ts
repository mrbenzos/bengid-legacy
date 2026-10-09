/**
 * Uploads an image through the server route (/api/upload), which stores it in
 * Supabase Storage when configured and falls back to public/uploads locally.
 * Returns the public URL.
 */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.');
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Image is too large (max 8MB).');
  }
  const body = new FormData();
  body.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Upload failed. Please try again.');
  }
  return data.url as string;
}
