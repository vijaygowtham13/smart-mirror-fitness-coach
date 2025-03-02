import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PoseDetection from "@/components/workout/PoseDetection";
import WorkoutRecommendations from "@/components/workout/WorkoutRecommendations";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Check, Clock, Dumbbell, User, Heart, HeartPulse, Volume2, List, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkoutMetrics {
  duration: number;
  caloriesBurned: number;
  heartRate: number;
  exercisesCompleted: number;
  totalExercises: number;
}

const WorkoutSession = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<WorkoutMetrics>({
    duration: 0,
    caloriesBurned: 0,
    heartRate: 0,
    exercisesCompleted: 0,
    totalExercises: 12
  });
  
  const [isWorkoutActive, setIsWorkoutActive] = useState(true);
  const [currentSet, setCurrentSet] = useState(3);
  const [currentSetProgress, setCurrentSetProgress] = useState(45);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (!isWorkoutActive) return;
    
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newDuration = prev.duration + 1;
        const newCalories = Math.floor(newDuration * 0.15);
        const newHeartRate = 120 + Math.floor(Math.sin(newDuration * 0.05) * 10) + Math.floor(Math.random() * 10);
        const newSetProgress = (currentSetProgress + 1) % 100;
        
        if (newSetProgress === 0) {
          toast({
            title: "Set completed!",
            description: `You've completed set ${currentSet} of your current exercise.`,
          });
          
          if (currentSet === 3) {
            return {
              ...prev,
              duration: newDuration,
              caloriesBurned: newCalories,
              heartRate: newHeartRate,
              exercisesCompleted: Math.min(prev.exercisesCompleted + 1, prev.totalExercises)
            };
          }
          
          setCurrentSet(prev => prev < 3 ? prev + 1 : 1);
        }
        
        setCurrentSetProgress(newSetProgress);
        
        return {
          ...prev,
          duration: newDuration,
          caloriesBurned: newCalories,
          heartRate: newHeartRate
        };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isWorkoutActive, currentSet, currentSetProgress, toast]);

  const handleEndWorkout = () => {
    setIsWorkoutActive(false);
    toast({
      title: "Workout completed!",
      description: `You burned ${metrics.caloriesBurned} calories in ${formatDuration(metrics.duration)}.`,
    });
  };

  const handleCompleteExercise = () => {
    setCurrentSet(1);
    setCurrentSetProgress(0);
    setMetrics(prev => ({
      ...prev,
      exercisesCompleted: Math.min(prev.exercisesCompleted + 1, prev.totalExercises)
    }));
    toast({
      title: "Exercise completed!",
      description: "Great job! Moving to the next exercise.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Workout Session</h1>
                <p className="text-muted-foreground">Get real-time feedback and guidance during your workout.</p>
              </div>
              
              <PoseDetection />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <BlurredCard className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-primary/10 p-3 rounded-full mb-1">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-semibold">{formatDuration(metrics.duration)}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </BlurredCard>
                
                <BlurredCard className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-green-500/10 p-3 rounded-full mb-1">
                    <Dumbbell className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-3xl font-semibold">{metrics.caloriesBurned}</div>
                  <div className="text-sm text-muted-foreground">Calories Burned</div>
                </BlurredCard>
                
                <BlurredCard className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-red-500/10 p-3 rounded-full mb-1">
                    <HeartPulse className="h-6 w-6 text-red-500" />
                  </div>
                  <div className="text-3xl font-semibold">{metrics.heartRate}</div>
                  <div className="text-sm text-muted-foreground">Avg. Heart Rate</div>
                </BlurredCard>
              </div>
              
              <BlurredCard className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Current Exercise</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <List className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="bg-secondary/70 p-4 rounded-lg mr-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">Squat</h4>
                    <p className="text-sm text-muted-foreground">3 sets of 12 reps</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Volume2 className="h-4 w-4" /> Guide
                    </Button>
                    <Button size="sm" className="gap-1" onClick={handleCompleteExercise}>
                      <Check className="h-4 w-4" /> Complete
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Set 1</span>
                      <span className="text-green-500 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Completed
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Set 2</span>
                      <span className="text-green-500 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Completed
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Set 3</span>
                      <span className="text-muted-foreground">In Progress</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${currentSetProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard>
                <h3 className="text-xl font-semibold mb-4">AI Form Feedback</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Good knee alignment</h4>
                      <p className="text-muted-foreground text-sm">Your knees are tracking correctly over your toes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Proper depth</h4>
                      <p className="text-muted-foreground text-sm">You're reaching the ideal squat depth for maximum engagement.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Suggestion for improvement</h4>
                      <p className="text-muted-foreground text-sm">Try to keep your chest more upright during the movement.</p>
                    </div>
                  </div>
                </div>
              </BlurredCard>
            </div>
            
            <div className="lg:w-1/3 space-y-8">
              <BlurredCard>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                      alt="User profile"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Alex Johnson</h3>
                    <p className="text-sm text-muted-foreground">Intermediate Level</p>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Today's Goal</span>
                      <span className="font-medium">45 min workout</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-primary rounded-full" 
                           style={{ width: `${Math.min((metrics.duration / (45 * 60)) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Weekly Progress</span>
                      <span className="font-medium">{metrics.exercisesCompleted}/6 workouts</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-primary rounded-full" 
                           style={{ width: `${(metrics.exercisesCompleted / 6) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Workouts</p>
                      <p className="text-xl font-semibold">{metrics.exercisesCompleted}</p>
                      <p className="text-xs text-green-500">↑ 12%</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Calories</p>
                      <p className="text-xl font-semibold">{metrics.caloriesBurned}</p>
                      <p className="text-xs text-green-500">↑ 8%</p>
                    </div>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard>
                <h3 className="text-xl font-semibold mb-4">Workout Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-full mr-3">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Full Body Power</h4>
                        <p className="text-sm text-muted-foreground">{metrics.totalExercises} exercises</p>
                      </div>
                    </div>
                    <div className="text-sm">{Math.round((metrics.exercisesCompleted / metrics.totalExercises) * 100)}%</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start time</span>
                      <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Elapsed time</span>
                      <span>{formatDuration(metrics.duration)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exercises completed</span>
                      <span>{metrics.exercisesCompleted}/{metrics.totalExercises}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full" onClick={handleEndWorkout}>End Workout</Button>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard>
                <h3 className="text-xl font-semibold mb-4">Coming Up Next</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-green-500/10 rounded-full mr-3 flex-shrink-0">
                      <Dumbbell className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Push-ups</h4>
                      <p className="text-sm text-muted-foreground">3 sets x 15 reps</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-indigo-500/10 rounded-full mr-3 flex-shrink-0">
                      <Dumbbell className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Lunges</h4>
                      <p className="text-sm text-muted-foreground">3 sets x 12 reps each leg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                    <div className="p-2 bg-purple-500/10 rounded-full mr-3 flex-shrink-0">
                      <Dumbbell className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Plank</h4>
                      <p className="text-sm text-muted-foreground">3 sets x 45 seconds</p>
                    </div>
                  </div>
                </div>
              </BlurredCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutSession;
