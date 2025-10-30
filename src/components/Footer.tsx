import React from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
const Footer = () => {
  return (
    <>
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SportAI Predictor
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered sports predictions for smarter betting decisions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-foreground transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teams"
                    className="hover:text-foreground transition"
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    to="/performance"
                    className="hover:text-foreground transition"
                  >
                    Performance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition"
                  >
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © 2025 SportAI Predictor. All rights reserved. Not financial or
              betting advice.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
