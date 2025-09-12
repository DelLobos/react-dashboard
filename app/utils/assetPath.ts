/**
 * Get the correct path for public assets based on the environment
 * This handles the GitHub Pages base path correctly
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, use the path as-is
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production (GitHub Pages), prepend the base path
  return `/react-dashboard/${cleanPath}`;
}