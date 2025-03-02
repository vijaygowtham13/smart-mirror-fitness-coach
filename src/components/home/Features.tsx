
import React from "react";
import { Camera, Brain, Activity, BarChart2, Tablet, Share2 } from "lucide-react";
import BlurredCard from "@/components/ui/BlurredCard";

const features = [
  {
    title: "Real-time Form Analysis",
    description: "Computer vision technology tracks your movements and provides instant feedback on your exercise form.",
    icon: Camera,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Personalized AI Coach",
    description: "Our AI analyzes your performance and creates tailored workout plans to meet your specific fitness goals.",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Step-by-step Guidance",
    description: "Follow detailed instructions for each exercise, with cues for proper form, breathing, and movement.",
    icon: Activity,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvements over time with detailed analytics and performance insights.",
    icon: BarChart2,
    color: "from-orange-500 to-amber-400",
  },
  {
    title: "Device Integration",
    description: "Connects seamlessly with your fitness trackers and wearables for comprehensive health monitoring.",
    icon: Tablet,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Social Sharing",
    description: "Share your achievements with friends and family to stay motivated and accountable.",
    icon: Share2,
    color: "from-blue-500 to-indigo-500",
  },
];

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced AI Features</h2>
          <p className="text-xl text-muted-foreground">
            Our smart mirror combines cutting-edge technology with an intuitive interface to transform your workout experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurredCard 
              key={index} 
              className="flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              hoverEffect
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color}`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </BlurredCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
