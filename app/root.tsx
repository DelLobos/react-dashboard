import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Tech.Care Dashboard – Patient Health Monitoring</title>
        <meta name="description" content="Tech.Care Dashboard: Monitor patient vitals, diagnostics, and health history in a modern, responsive interface." />
        <meta name="keywords" content="health, dashboard, patient, vitals, diagnostics, medical, monitoring" />
        <meta name="author" content="Tech.Care" />
        
        <meta property="og:title" content="Tech.Care Dashboard – Patient Health Monitoring" />
        <meta property="og:description" content="Monitor patient vitals, diagnostics, and health history in a modern, responsive interface." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/TestLogo.svg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech.Care Dashboard – Patient Health Monitoring" />
        <meta name="twitter:description" content="Monitor patient vitals, diagnostics, and health history in a modern, responsive interface." />
        <meta name="twitter:image" content="/images/TestLogo.svg" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body>
        <main id="main-content">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
