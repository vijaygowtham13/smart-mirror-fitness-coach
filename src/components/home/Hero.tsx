
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, CheckCircle } from "lucide-react";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] opacity-20 dark:opacity-10">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-primary/80 to-blue-400/50 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-1/2 h-full bg-gradient-to-r from-indigo-500/50 to-purple-500/40 blur-[120px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary mb-4 animate-fade-in">
              <p className="text-sm font-medium text-foreground/80 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-primary" />
                AI-Powered Fitness Coach
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in [animation-delay:200ms]">
              Your Personal <span className="text-gradient">AI Trainer</span> in a Smart Mirror
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl animate-fade-in [animation-delay:400ms]">
              Get real-time feedback, personalized workouts, and track your progress with cutting-edge computer vision technology.
            </p>
            
            <div className="space-y-3 mb-8 animate-fade-in [animation-delay:600ms]">
              {[
                "Real-time form feedback",
                "Personalized workout plans",
                "Progress tracking analytics",
                "AI-powered virtual trainers"
              ].map((feature, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:800ms]">
              <Button asChild size="lg" className="rounded-full px-8 button-hover-effect">
                <Link to="/workout">
                  Try a Workout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-2 px-8 button-hover-effect"
                asChild
              >
                <Link to="/progress">
                  View Demo
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in [animation-delay:1000ms]">
            <BlurredCard className="p-0 overflow-hidden">
              <div className="aspect-video relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10" />
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1470"
                  className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 hover:scale-100"
                  alt="Smart Mirror AI Fitness"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-foreground/10 backdrop-blur-sm p-5 border border-white/20">
                    <div className="animate-pulse-light">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3L19 12L5 21V3Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </BlurredCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
