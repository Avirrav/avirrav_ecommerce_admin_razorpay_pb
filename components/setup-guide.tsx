'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SetupStep {
  title: string;
  description: string;
  completed: boolean;
}

interface SetupGuideProps {
  steps: SetupStep[];
}

export const SetupGuide = ({ steps }: SetupGuideProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if all steps are completed
  const allStepsCompleted = steps.every(step => step.completed);
  
  // Hide the guide when all steps are completed
  useEffect(() => {
    if (allStepsCompleted) {
      setIsVisible(false);
    }
  }, [allStepsCompleted]);

  if (!isVisible) return null;

  return (
    <Card className="w-full relative border-2 border-black rounded-lg neo-shadow bg-background">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-3 rounded-md border-2 border-black neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200 bg-background text-primary"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4 text-primary" />
      </Button>
      <CardHeader className="border-b-2 border-primary/20 pb-4 bg-accent/5">
        <CardTitle className="text-xl font-bold text-primary">Store Setup Guide</CardTitle>
        <CardDescription className="text-primary/80 font-medium pt-1">
          Follow these steps to set up your store completely
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 bg-background">
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start space-x-4 p-4 rounded-md transition-colors",
                step.completed ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30" : 
                "hover:bg-accent/5 border border-transparent hover:border-primary/10"
              )}
            >
              {step.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500 shrink-0" />
              ) : (
                <Circle className="h-6 w-6 text-primary/50 shrink-0" />
              )}
              <div>
                <h3 className={cn(
                  "font-bold",
                  step.completed ? "text-green-700 dark:text-green-400" : "text-primary"
                )}>
                  {step.title}
                </h3>
                <p className={cn(
                  "text-sm mt-1 font-medium",
                  step.completed ? "text-green-600/90 dark:text-green-400/90" : "text-primary/70"
                )}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 