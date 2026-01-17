import { Quiz } from '@/components/quiz';
import { QUIZZES } from '@/lib/data';

export default function PracticePage() {
  const quiz = QUIZZES[0]; // For demonstration, we'll use the first quiz

  return (
    <div className="space-y-8">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Practice Zone</h1>
        <p className="text-muted-foreground">
          Test your knowledge and reinforce your learning with quizzes.
        </p>
      </div>
      <Quiz quiz={quiz} />
    </div>
  );
}
