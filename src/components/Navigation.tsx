import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, TrendingUp, Info, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/teams", label: "Teams", icon: Trophy },
    { path: "/performance", label: "Performance", icon: TrendingUp },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SportAI Predictor
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className={
                  isActive("/profile") ? "bg-primary/10 text-primary" : ""
                }
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="gradient-primary text-primary-foreground border-0"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center justify-around pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
