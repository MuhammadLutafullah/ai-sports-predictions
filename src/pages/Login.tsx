import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/performance";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://18.117.132.151:8080/backend/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from backend
        if (response.status === 401) {
          toast.error("Invalid Credentials", {
            description: "The email or password you entered is incorrect.",
          });
        } else if (response.status === 404) {
          toast.error("User Not Found", {
            description: "No account exists with this email address.",
          });
        } else if (response.status === 400) {
          toast.error("Invalid Request", {
            description:
              data.message || "Please check your input and try again.",
          });
        } else {
          toast.error("Login Failed", {
            description: data.message || "An error occurred. Please try again.",
          });
        }
        return;
      }

      // If the backend returns a token, store it
      if (data.access_token) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", data.access_token);

        toast.success("Welcome Back!", {
          description: "You have successfully logged in.",
        });

        // Small delay to show the success toast
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 500);
      } else {
        toast.error("Login Failed", {
          description: "Invalid email or password.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Connection Error", {
        description: "Unable to connect to the server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 mb-8"
        >
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SportAI Predictor
          </span>
        </Link>

        <Card className="p-8 glass border-border/50">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to access your predictions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground border-0"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-semibold"
            >
              Create one
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
