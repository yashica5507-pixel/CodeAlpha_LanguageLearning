"use client";

import * as React from 'react';
import { Mic, StopCircle, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import { assessPronunciationAccuracy } from '@/ai/flows/assess-pronunciation-accuracy';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Word } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type AssessResult = {
  accuracyScore: number;
  feedback: string;
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export function PronunciationTool({ word }: { word: Word }) {
  const { recordingState, startRecording, stopRecording, audioBlob, reset } = useAudioRecorder();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<AssessResult | null>(null);
  const { toast } = useToast();

  const handleRecordClick = () => {
    if (recordingState === 'recording') {
      stopRecording();
    } else {
      setResult(null);
      reset();
      startRecording();
    }
  };
  
  const handleReset = () => {
    setResult(null);
    reset();
  }

  React.useEffect(() => {
    if (recordingState === 'stopped' && audioBlob) {
      const processAudio = async () => {
        setIsLoading(true);
        try {
          const dataUri = await blobToBase64(audioBlob);
          const aiResult = await assessPronunciationAccuracy({
            wordOrPhrase: word.pronunciation,
            userRecordingDataUri: dataUri,
            targetLanguage: 'Spanish', // Should be dynamic
          });
          setResult(aiResult);
        } catch (error) {
          console.error("Error assessing pronunciation:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not assess pronunciation. Please try again.",
          });
        } finally {
          setIsLoading(false);
        }
      };
      processAudio();
    }
    if(recordingState === 'error'){
      toast({
            variant: "destructive",
            title: "Recording Error",
            description: "Could not access microphone. Please check permissions.",
          });
    }
  }, [recordingState, audioBlob, word, toast]);

  const getStatusColor = (score: number) => {
    if (score > 80) return 'text-green-500';
    if (score > 50) return 'text-yellow-500';
    return 'text-red-500';
  }
  
  const RecordIcon = recordingState === 'recording' ? StopCircle : Mic;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium text-center">
          Practice "{word.word}"
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Button
          onClick={handleRecordClick}
          size="icon"
          className={cn(
            "h-16 w-16 rounded-full",
            recordingState === 'recording' && 'bg-red-500 hover:bg-red-600 animate-pulse'
          )}
          disabled={isLoading}
        >
          <RecordIcon className="h-8 w-8" />
          <span className="sr-only">
            {recordingState === 'recording' ? 'Stop recording' : 'Start recording'}
          </span>
        </Button>
        {isLoading && <p className="text-sm text-muted-foreground">Assessing...</p>}
        {result && (
          <div className="w-full space-y-2 text-center">
             <div className="flex items-center justify-center gap-2">
              {result.accuracyScore > 80 ? (
                <CheckCircle className={cn("h-6 w-6", getStatusColor(result.accuracyScore))} />
              ) : (
                <XCircle className={cn("h-6 w-6", getStatusColor(result.accuracyScore))} />
              )}
              <p className={cn("text-2xl font-bold", getStatusColor(result.accuracyScore))}>
                {result.accuracyScore}%
              </p>
            </div>
            <Progress value={result.accuracyScore} />
            <p className="text-sm text-muted-foreground">{result.feedback}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" onClick={handleReset} disabled={isLoading}>
          <RotateCw className="mr-2 h-4 w-4" /> Try again
        </Button>
      </CardFooter>
    </Card>
  );
}
