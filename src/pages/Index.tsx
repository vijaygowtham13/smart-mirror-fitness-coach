
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProgressChart from "@/components/analytics/ProgressChart";
import WorkoutRecommendations from "@/components/workout/WorkoutRecommendations";
import BlurredCard from "@/components/ui/BlurredCard";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* Demo section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Mirror</h2>
              <p className="text-xl text-muted-foreground">
                See how our Smart Mirror AI coach can transform your fitness journey with real-time tracking and personalized guidance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="animate-fade-in">
                <ProgressChart />
              </div>
              
              <div className="space-y-8 animate-fade-in [animation-delay:200ms]">
                <BlurredCard>
                  <h3 className="text-xl font-semibold mb-4">Your Fitness Insights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Improved Form</h4>
                        <p className="text-muted-foreground text-sm">Your squat form has improved by 27% over the last week.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Consistency Badge Earned</h4>
                        <p className="text-muted-foreground text-sm">You've completed workouts for 5 consecutive days!</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">New Personal Record</h4>
                        <p className="text-muted-foreground text-sm">You've reached a new 30-minute endurance milestone.</p>
                      </div>
                    </div>
                  </div>
                </BlurredCard>
                
                <BlurredCard>
                  <h3 className="text-xl font-semibold mb-4">AI Coach Recommendations</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Based on your recent activity, we recommend:</p>
                    <ul className="space-y-2">
                      <li className="bg-secondary/50 p-3 rounded-lg text-sm">Focus on upper body strength in your next session</li>
                      <li className="bg-secondary/50 p-3 rounded-lg text-sm">Increase workout duration gradually to 45 minutes</li>
                      <li className="bg-secondary/50 p-3 rounded-lg text-sm">Try HIIT training to boost your cardiovascular health</li>
                    </ul>
                    <Button asChild className="w-full mt-4 button-hover-effect">
                      <Link to="/workout">
                        Start Personalized Workout <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </BlurredCard>
              </div>
            </div>
            
            <div className="animate-fade-in [animation-delay:400ms]">
              <WorkoutRecommendations />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/80 to-blue-400/50 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-indigo-500/50 to-purple-500/40 blur-[120px]" />
            </div>
          </div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who have revolutionized their workout routine with our Smart Mirror AI coach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8 button-hover-effect">
                  Get Started Now
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 button-hover-effect">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
