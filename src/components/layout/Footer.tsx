import React from "react";
import { cn } from "@/lib/utils";
import { Github, Heart, Mail, Twitter } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("bg-muted/50 py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Smart Mirror</h3>
            <p className="text-muted-foreground max-w-md">
              The AI-powered fitness solution that transforms your home workout experience with real-time feedback and personalized training.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Smart Mirror. All rights reserved.
            </p>
            <p className="flex items-center text-sm text-muted-foreground mt-4 md:mt-0">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for a better fitness experience
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
