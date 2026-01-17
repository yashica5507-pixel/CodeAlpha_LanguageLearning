import { LessonList } from '@/components/lesson-list';
import { LANGUAGES, USER_PROGRESS } from '@/lib/data';

export default function LessonsPage() {
  const currentLanguage = LANGUAGES.find(lang => lang.id === USER_PROGRESS.language);

  return (
    <div className="space-y-8">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {currentLanguage?.flag} {currentLanguage?.name} Lessons
        </h1>
        <p className="text-muted-foreground">
          Choose a lesson to start learning or review what you've learned.
        </p>
      </div>
      <LessonList />
    </div>
  );
}
