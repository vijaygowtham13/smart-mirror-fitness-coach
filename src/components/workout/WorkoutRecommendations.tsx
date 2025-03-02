
import React from "react";
import { Clock, Dumbbell, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurredCard from "@/components/ui/BlurredCard";

const workouts = [
  {
    title: "Morning Cardio Blast",
    description: "Start your day with this energizing cardio routine to boost your metabolism.",
    duration: "20 min",
    intensity: "Medium",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "Core Strength Builder",
    description: "Focus on your core with this targeted workout for abs and lower back.",
    duration: "15 min",
    intensity: "Hard",
    category: "Strength",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Full Body Toning",
    description: "A comprehensive workout targeting all major muscle groups for total body fitness.",
    duration: "30 min",
    intensity: "Medium",
    category: "Full Body",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  }
];

const WorkoutRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Recommended Workouts</h3>
        <Button variant="ghost" className="gap-2">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <BlurredCard 
            key={index} 
            className="flex flex-col h-full"
            hoverEffect
          >
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src={workout.image} 
                alt={workout.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 glass-card py-1 px-2 text-xs font-medium text-white">
                {workout.category}
              </div>
            </div>
            
            <h4 className="text-lg font-semibold mb-2">{workout.title}</h4>
            <p className="text-muted-foreground mb-4 text-sm flex-grow">{workout.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {workout.duration}
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Dumbbell className="h-4 w-4 mr-1" />
                  {workout.intensity}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </BlurredCard>
        ))}
      </div>
    </div>
  );
};

export default WorkoutRecommendations;
