import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgressChart from "@/components/analytics/ProgressChart";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  BarChart2, 
  TrendingUp, 
  Clock, 
  Award, 
  ChevronDown,
  Dumbbell,
  HeartPulse,
  Flame,
  Zap
} from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

const Progress = () => {
  const { sessions, getTotalStats } = useWorkout();
  const stats = getTotalStats();
  
  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  
  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your fitness journey and see your improvements over time.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <BlurredCard className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-semibold">{stats.totalWorkouts}</div>
              <div className="text-sm text-muted-foreground">Workouts Completed</div>
              <div className="text-xs text-green-500 mt-1">↑ 12% from last month</div>
            </BlurredCard>
            
            <BlurredCard className="flex flex-col items-center text-center p-6">
              <div className="bg-green-500/10 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-3xl font-semibold">{formatTotalTime(stats.totalDuration)}</div>
              <div className="text-sm text-muted-foreground">Total Workout Time</div>
              <div className="text-xs text-green-500 mt-1">↑ 8% from last month</div>
            </BlurredCard>
            
            <BlurredCard className="flex flex-col items-center text-center p-6">
              <div className="bg-purple-500/10 p-3 rounded-full mb-3">
                <Flame className="h-6 w-6 text-purple-500" />
              </div>
              <div className="text-3xl font-semibold">{stats.totalCalories.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Calories Burned</div>
              <div className="text-xs text-green-500 mt-1">↑ 15% from last month</div>
            </BlurredCard>
            
            <BlurredCard className="flex flex-col items-center text-center p-6">
              <div className="bg-amber-500/10 p-3 rounded-full mb-3">
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              <div className="text-3xl font-semibold">{Math.min(8, Math.floor(stats.totalWorkouts / 3))}</div>
              <div className="text-sm text-muted-foreground">Achievements Earned</div>
              <div className="text-xs text-green-500 mt-1">↑ 2 new this month</div>
            </BlurredCard>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <ProgressChart />
            </div>
            
            <div className="space-y-8">
              <BlurredCard>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Fitness Score</h3>
                  <Button variant="ghost" size="sm" className="gap-1">
                    This Month <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="currentColor" 
                        className="text-muted/20" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="currentColor" 
                        className="text-primary" 
                        strokeWidth="10" 
                        strokeDasharray="282.7" 
                        strokeDashoffset="56.54" 
                        strokeLinecap="round" 
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-4xl font-bold">78</div>
                      <div className="text-sm text-muted-foreground">Good</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <Dumbbell className="h-4 w-4 mr-1 text-blue-500" /> Strength
                      </span>
                      <span className="font-medium">82/100</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <HeartPulse className="h-4 w-4 mr-1 text-red-500" /> Cardio
                      </span>
                      <span className="font-medium">75/100</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center">
                        <Zap className="h-4 w-4 mr-1 text-yellow-500" /> Flexibility
                      </span>
                      <span className="font-medium">68/100</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard>
                <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-amber-500/10 p-2 rounded-full mr-3">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Consistency Champion</h4>
                      <p className="text-sm text-muted-foreground">Completed workouts for 7 consecutive days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-purple-500/10 p-2 rounded-full mr-3">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Form Master</h4>
                      <p className="text-sm text-muted-foreground">Achieved perfect form on 5 different exercises</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-green-500/10 p-2 rounded-full mr-3">
                      <Flame className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Calorie Crusher</h4>
                      <p className="text-sm text-muted-foreground">Burned over 10,000 calories in one month</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4">
                  View All Achievements
                </Button>
              </BlurredCard>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BlurredCard>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Workout History</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4 mr-1" /> Filter
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentSessions.length > 0 ? (
                  recentSessions.map((session, index) => {
                    const sessionDate = new Date(session.date);
                    const isToday = new Date().toDateString() === sessionDate.toDateString();
                    const isYesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() === sessionDate.toDateString();
                    const dateDisplay = isToday 
                      ? "Today" 
                      : isYesterday 
                        ? "Yesterday" 
                        : sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    
                    return (
                      <div key={session.id} className="flex items-center p-3 bg-secondary/50 rounded-lg">
                        <div className="p-2 bg-blue-500/10 rounded-full mr-3 flex-shrink-0">
                          <Dumbbell className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{session.name}</h4>
                            <span className="text-xs text-muted-foreground">{dateDisplay}</span>
                          </div>
                          <div className="flex text-sm text-muted-foreground gap-4 mt-1">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {Math.floor(session.duration / 60)} min
                            </span>
                            <span className="flex items-center">
                              <Flame className="h-3 w-3 mr-1" /> {session.caloriesBurned} cal
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No workout history yet. Complete a workout to see it here!
                  </div>
                )}
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                View Complete History
              </Button>
            </BlurredCard>
            
            <BlurredCard>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Improvement Areas</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <BarChart2 className="h-4 w-4 mr-1" /> Details
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Squat Form</h4>
                    <span className="text-green-500 text-sm">+27% improved</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your squat form has improved significantly over the past month, especially in knee alignment.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Workout Consistency</h4>
                    <span className="text-green-500 text-sm">+15% improved</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    You've been more consistent with your workout schedule, with fewer missed sessions.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Upper Body Strength</h4>
                    <span className="text-yellow-500 text-sm">Needs attention</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your upper body exercises could use more focus. We recommend increasing push-up and pull-up frequency.
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full">
                    Get Personalized Improvement Plan
                  </Button>
                </div>
              </div>
            </BlurredCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progress;
