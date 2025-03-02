
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WorkoutSession {
  id: string;
  date: Date;
  duration: number; // in seconds
  caloriesBurned: number;
  exercisesCompleted: number;
  heartRateAvg: number;
  name: string;
}

interface WorkoutContextType {
  sessions: WorkoutSession[];
  addSession: (session: Omit<WorkoutSession, "id" | "date">) => void;
  getWeeklyData: () => {
    day: string;
    workout: number;
    calories: number;
    duration: number;
  }[];
  getTotalStats: () => {
    totalWorkouts: number;
    totalDuration: number; // in seconds
    totalCalories: number;
    averageHeartRate: number;
  };
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => {
    // Load from localStorage on initial render
    const savedSessions = localStorage.getItem("workoutSessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  // Save to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem("workoutSessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (sessionData: Omit<WorkoutSession, "id" | "date">) => {
    const newSession: WorkoutSession = {
      ...sessionData,
      id: crypto.randomUUID(),
      date: new Date(),
    };
    
    setSessions((prev) => [...prev, newSession]);
  };

  const getWeeklyData = () => {
    // Get days of the current week
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });

    // Map day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create data array with all days of the week
    return weekDays.map((date, index) => {
      // Filter sessions for this day
      const daysSessions = sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.toDateString() === date.toDateString();
      });
      
      // Compute aggregates
      const workout = daysSessions.length 
        ? Math.round(daysSessions.reduce((sum, s) => sum + s.exercisesCompleted, 0) / daysSessions.length * 10) 
        : 0;
      const calories = daysSessions.reduce((sum, s) => sum + s.caloriesBurned, 0);
      const duration = Math.round(daysSessions.reduce((sum, s) => sum + s.duration, 0) / 60); // convert to minutes
      
      return {
        day: dayNames[date.getDay()],
        workout,
        calories,
        duration
      };
    });
  };

  const getTotalStats = () => {
    if (sessions.length === 0) {
      return {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageHeartRate: 0
      };
    }

    const totalWorkouts = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const totalCalories = sessions.reduce((sum, session) => sum + session.caloriesBurned, 0);
    const averageHeartRate = Math.round(
      sessions.reduce((sum, session) => sum + session.heartRateAvg, 0) / sessions.length
    );

    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      averageHeartRate
    };
  };

  return (
    <WorkoutContext.Provider value={{ sessions, addSession, getWeeklyData, getTotalStats }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  
  return context;
};
