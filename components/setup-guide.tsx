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
    <Card className="w-full relative">
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute right-3 top-3"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader className="pb-4">
        <CardTitle className="text-heading text-foreground">Store Setup Guide</CardTitle>
        <CardDescription className="text-muted-foreground">
          Follow these steps to set up your store completely
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start space-x-3 p-3 rounded-md polaris-transition",
                step.completed ? "bg-success-subdued" : "hover:bg-surface-hovered"
              )}
            >
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={cn(
                  "font-medium text-body",
                  step.completed ? "text-success" : "text-foreground"
                )}>
                  {step.title}
                </h3>
                <p className={cn(
                  "text-body-sm mt-1",
                  step.completed ? "text-success" : "text-muted-foreground"
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