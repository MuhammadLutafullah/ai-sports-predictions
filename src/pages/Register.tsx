import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Don't Match", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    if (!agreedToTerms) {
      toast.error("Terms of Service Required", {
        description: "Please agree to the Terms of Service before continuing.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://18.117.132.151:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJndWxmYXJtcGFpaUBleGFtcGxlLmNvbSIsImV4cCI6MTc2MTkyNTg4MH0.oqfWR74SGyrHBFRCXKUCT_KajJHWc28V7rGdT_rtZ1Y",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from backend
        if (response.status === 409) {
          toast.error("Email Already Exists", {
            description:
              "An account with this email already exists. Please login instead.",
          });
        } else if (response.status === 400) {
          toast.error("Invalid Input", {
            description:
              data.detail || "Please check your information and try again.",
          });
        } else {
          toast.error("Registration Failed", {
            description:
              data.detail || "Registration failed. Please try again.",
          });
        }
        return;
      }

      // ✅ Success
      toast.success("Registration Successful! 🎉", {
        description: "Your account has been created. You can now log in.",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Connection Error", {
        description: "An error occurred. Please try again later.",
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
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join thousands of sports analytics enthusiasts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-muted/30"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground border-0"
              disabled={!agreedToTerms || loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
