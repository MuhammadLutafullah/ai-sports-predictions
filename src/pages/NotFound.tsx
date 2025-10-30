import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Rough Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-secondary/5 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Animated Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="text-center glass border border-border/40 rounded-2xl p-8 shadow-lg relative group hover:glow-primary transition-all duration-500 hover:scale-105">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-md group-hover:animate-gradient transition-opacity duration-500 -z-10"></div>

        <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oops! Page not found
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          The page{" "}
          <code className="text-code bg-muted px-2 py-1 rounded">
            {location.pathname}
          </code>{" "}
          doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:glow-primary hover:scale-105"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
