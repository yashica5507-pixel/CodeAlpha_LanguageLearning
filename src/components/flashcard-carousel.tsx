"use client";

import * as React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Word } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PronunciationTool } from './pronunciation-tool';

function Flashcard({ word }: { word: Word }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleSoundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.pronunciation);
    utterance.lang = 'es-ES'; // This should be dynamic based on user's selected language
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full h-full perspective">
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-500"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="h-full flex flex-col items-center justify-center cursor-pointer">
            <CardContent className="p-6 text-center">
              <h2 className="text-4xl font-bold font-headline">{word.word}</h2>
              <p className="text-muted-foreground mt-2">Click to see translation</p>
            </CardContent>
          </Card>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <Card className="h-full flex flex-col items-center justify-center cursor-pointer">
            <CardContent className="p-6 text-center">
              <h3 className="text-3xl font-semibold">{word.translation}</h3>
              <p className="text-muted-foreground italic mt-2">"{word.exampleSentence}"</p>
              <Button variant="ghost" size="icon" className="mt-4" onClick={handleSoundClick}>
                <Volume2 className="h-6 w-6" />
                <span className="sr-only">Listen to pronunciation</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function FlashcardCarousel({ words }: { words: Word[] }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {words.map((word, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 aspect-square h-[450px]">
              <div className="flex flex-col h-full gap-4">
                <Flashcard word={word} />
                <PronunciationTool word={word} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  );
}
