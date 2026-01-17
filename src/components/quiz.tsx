"use client";

import * as React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Quiz as QuizType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function Quiz({ quiz }: { quiz: QuizType }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];

  const handleOptionChange = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value,
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let finalScore = 0;
      quiz.questions.forEach(q => {
        if(selectedAnswers[q.id] === q.correctAnswer) {
          finalScore++;
        }
      });
      setScore(Math.round((finalScore / quiz.questions.length) * 100));
      setShowResult(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{quiz.title}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>
          <RadioGroup
            value={selectedOption}
            onValueChange={handleOptionChange}
            disabled={isSubmitted}
          >
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedOption;
              const isWrong = isSelected && !isCorrect;

              return (
                <Label
                  key={option}
                  className={cn(
                    'flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent/50',
                    isSubmitted && isCorrect && 'border-green-500 bg-green-500/10',
                    isSubmitted && isWrong && 'border-red-500 bg-red-500/10'
                  )}
                >
                  <RadioGroupItem value={option} />
                  <span>{option}</span>
                  {isSubmitted && isCorrect && <Check className="ml-auto h-5 w-5 text-green-500" />}
                  {isSubmitted && isWrong && <X className="ml-auto h-5 w-5 text-red-500" />}
                </Label>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} disabled={!selectedOption}>
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showResult} onOpenChange={setShowResult}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl">Quiz Complete!</AlertDialogTitle>
            <AlertDialogDescription className="text-center !text-lg">
              You scored
              <p className="text-4xl font-bold text-primary my-4">{score}%</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleRestart}>Try Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
