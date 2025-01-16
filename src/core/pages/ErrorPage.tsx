// src/pages/ErrorPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import React from 'react';

interface ErrorPageProps {
  title?: string;
  text?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ title, text }) => {
  return (
    <Card className="w-[450px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <CardHeader>
        <CardTitle className="text-center text-3xl">
          {title ?? 'Something Went Wrong'}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-lg">
        {text ??
          "We're sorry, something unexpected happened. Please try again later."}
      </CardContent>
    </Card>
  );
};
