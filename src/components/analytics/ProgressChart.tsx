
import React, { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurredCard from "@/components/ui/BlurredCard";

// Sample data
const data = [
  { day: "Mon", workout: 32, calories: 1200, duration: 25 },
  { day: "Tue", workout: 42, calories: 1800, duration: 35 },
  { day: "Wed", workout: 51, calories: 2200, duration: 45 },
  { day: "Thu", workout: 49, calories: 2100, duration: 42 },
  { day: "Fri", workout: 63, calories: 2500, duration: 55 },
  { day: "Sat", workout: 72, calories: 2800, duration: 65 },
  { day: "Sun", workout: 58, calories: 2300, duration: 50 },
];

type ChartType = "activity" | "calories" | "duration";

const getWeekData = (week: string) => {
  // In a real app, this would fetch different data for different weeks
  // For now, we'll just return the same data
  return data;
};

const ProgressChart = () => {
  const [chartType, setChartType] = useState<ChartType>("activity");
  const [currentWeek, setCurrentWeek] = useState("This Week");
  const [currentData, setCurrentData] = useState(data);

  const handleWeekChange = (week: string) => {
    setCurrentWeek(week);
    setCurrentData(getWeekData(week));
  };

  const renderChart = () => {
    switch (chartType) {
      case "activity":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWorkout" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="workout"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorWorkout)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "calories":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="calories"
                fill="url(#colorCalories)"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "duration":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <BlurredCard>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Your Progress</h3>
        <div className="flex space-x-2 items-center mt-2 sm:mt-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleWeekChange("Last Week")}
            aria-label="Previous week"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center bg-secondary px-3 py-1 rounded-md">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{currentWeek}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleWeekChange("Next Week")}
            aria-label="Next week"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-1">
        <Button
          onClick={() => setChartType("activity")}
          variant={chartType === "activity" ? "default" : "outline"}
          size="sm"
        >
          Activity Score
        </Button>
        <Button
          onClick={() => setChartType("calories")}
          variant={chartType === "calories" ? "default" : "outline"}
          size="sm"
        >
          Calories Burned
        </Button>
        <Button
          onClick={() => setChartType("duration")}
          variant={chartType === "duration" ? "default" : "outline"}
          size="sm"
        >
          Workout Duration
        </Button>
      </div>

      {renderChart()}

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Avg. Score</p>
          <p className="text-2xl font-semibold text-primary">52</p>
        </div>
        <div className="text-center p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Total Calories</p>
          <p className="text-2xl font-semibold text-purple-500">14,900</p>
        </div>
        <div className="text-center p-4 bg-secondary/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Workout Time</p>
          <p className="text-2xl font-semibold text-green-500">5h 17m</p>
        </div>
      </div>
    </BlurredCard>
  );
};

export default ProgressChart;
