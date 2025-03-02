
import React from "react";
import { cn } from "@/lib/utils";

interface BlurredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const BlurredCard = ({ 
  children, 
  className, 
  hoverEffect = false,
  ...props 
}: BlurredCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-elevated hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurredCard;
