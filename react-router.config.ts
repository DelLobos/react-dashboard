import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false, // Enable SPA mode for GitHub Pages
  // Add prerender configuration for static generation
  prerender: ["/"], // Prerender the home page
} satisfies Config;
