
import React, { useState } from "react";
import { Play, Pause, Camera, User, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurredCard from "@/components/ui/BlurredCard";

const PoseDetection = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="relative min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden mb-8">
      <BlurredCard className="h-full w-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Live Workout Session</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant={isActive ? "destructive" : "default"}
              onClick={() => setIsActive(!isActive)}
              className="gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="h-5 w-5" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" /> Start
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="relative flex-1 bg-black/5 dark:bg-black/20 rounded-xl overflow-hidden">
          {/* Placeholder for camera feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isActive ? (
              <div className="relative w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Workout camera feed"
                  className="w-full h-full object-cover"
                />
                
                {/* Pose skeleton overlay (simulated) */}
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 1000 600" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simulated pose detection lines and points */}
                  <g stroke="#3B82F6" strokeWidth="3" fill="none">
                    <line x1="500" y1="150" x2="500" y2="300" />
                    <line x1="500" y1="300" x2="450" y2="400" />
                    <line x1="500" y1="300" x2="550" y2="400" />
                    <line x1="500" y1="150" x2="400" y2="250" />
                    <line x1="500" y1="150" x2="600" y2="250" />
                    <line x1="400" y1="250" x2="350" y2="350" />
                    <line x1="600" y1="250" x2="650" y2="350" />
                  </g>
                  <g fill="#3B82F6">
                    <circle cx="500" cy="150" r="8" />
                    <circle cx="500" cy="300" r="8" />
                    <circle cx="450" cy="400" r="8" />
                    <circle cx="550" cy="400" r="8" />
                    <circle cx="400" cy="250" r="8" />
                    <circle cx="600" cy="250" r="8" />
                    <circle cx="350" cy="350" r="8" />
                    <circle cx="650" cy="350" r="8" />
                  </g>
                </svg>
                
                {/* Feedback UI */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <User className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">Good form! Keep your back straight.</p>
                      <div className="w-full bg-gray-300/30 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center px-4 py-8">
                <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium mb-2">Camera Preview</h4>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click "Start" to begin your workout session with real-time pose detection and feedback.
                </p>
              </div>
            )}
          </div>
        </div>
      </BlurredCard>
    </div>
  );
};

export default PoseDetection;
