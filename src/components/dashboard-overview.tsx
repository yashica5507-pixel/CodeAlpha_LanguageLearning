"use client";

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Book, Target } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LESSONS, USER_PROGRESS } from '@/lib/data';

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
};

export function DashboardOverview() {
  const nextLesson = LESSONS.find(l => l.progress < 100);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Daily Goal
          </CardTitle>
          <CardDescription>
            You've completed {USER_PROGRESS.dailyGoal}% of your daily goal. Keep going!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={USER_PROGRESS.dailyGoal} aria-label={`${USER_PROGRESS.dailyGoal}% of daily goal`} />
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Your goal is 10 new words a day.</p>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Weekly Activity</CardTitle>
          <CardDescription>Your quiz scores over the last week.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <BarChart accessibilityLayer data={USER_PROGRESS.weeklyActivity} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 100]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {nextLesson && (
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Continue Learning
              </CardTitle>
              <CardDescription>
                Your next lesson: {nextLesson.title}
              </CardDescription>
            </div>
             <Button asChild size="sm">
              <Link href={`/lessons/${nextLesson.id}`}>
                Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">{nextLesson.progress}% complete</p>
              <Progress value={nextLesson.progress} aria-label={`${nextLesson.progress}% complete`} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
