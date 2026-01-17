import { FlashcardCarousel } from '@/components/flashcard-carousel';
import { LESSONS } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default function LessonDetailPage({ params }: { params: { lessonId: string } }) {
  const lesson = LESSONS.find((l) => l.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>
      {lesson.words.length > 0 ? (
         <FlashcardCarousel words={lesson.words} />
      ) : (
        <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">Words for this lesson are coming soon!</p>
        </div>
      )}
    </div>
  );
}
