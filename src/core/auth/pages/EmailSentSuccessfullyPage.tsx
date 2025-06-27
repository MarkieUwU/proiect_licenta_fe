import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useTranslation } from "react-i18next";

export const EmailSentSuccessfullyPage: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Pages.EmailSentSuccessfullyPage',
  });

  return (
    <Card className='w-full max-w-[500px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>{t('Title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-center">{t('Paragraph1')}</p>
        <p className="text-center">{t('Paragraph2')}</p>
      </CardContent>
    </Card>
  );
}