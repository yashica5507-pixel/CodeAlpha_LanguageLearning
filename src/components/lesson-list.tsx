import Link from 'next/link';
import { CheckCircle, Circle } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LESSONS } from '@/lib/data';

export function LessonList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {LESSONS.map((lesson) => (
        <Link href={`/lessons/${lesson.id}`} key={lesson.id} className="group">
          <Card className="h-full transition-all duration-200 group-hover:border-primary group-hover:shadow-md group-hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {lesson.progress === 100 ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
                 {lesson.progress === 100 && <Badge variant="secondary">Completed</Badge>}
                 {lesson.progress > 0 && lesson.progress < 100 && <Badge variant="outline">In Progress</Badge>}
              </div>
              <CardTitle className="font-headline">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <p className="text-sm text-muted-foreground">{lesson.words.length} words</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
