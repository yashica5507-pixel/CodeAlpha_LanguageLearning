import { Rocket } from 'lucide-react';
import React from 'react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <Rocket className="h-6 w-6 text-primary" />
      <h1 className="text-xl font-semibold text-sidebar-foreground font-headline group-data-[collapsible=icon]:hidden">
        LinguaLeap
      </h1>
    </div>
  );
}
