import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
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
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
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
  const navigate = useNavigate();

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
    <main className="flex flex-col items-center justify-center h-screen gap-6 p-4 text-center">
      <div>
        <h1 className="text-5xl font-bold mb-2">{message}</h1>
        <p className="text-muted-foreground text-lg">{details}</p>
      </div>

      {stack && (
        <pre className="w-full max-w-2xl p-4 overflow-x-auto text-left bg-muted rounded-lg">
          <code>{stack}</code>
        </pre>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground hover:opacity-90"
        >
          Regresar
        </button>
        <Link
          to="/"
          className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}

export function HydrateFallback() {
  return (
    <div id="loading-splash">
      <div id="loading-splash-spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}