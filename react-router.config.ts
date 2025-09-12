import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false, // Enable SPA mode for GitHub Pages
  // Add prerender configuration for static generation
  prerender: ["/"], // Prerender the home page
  // Set the basename for GitHub Pages
  basename: "/react-dashboard",
} satisfies Config;
