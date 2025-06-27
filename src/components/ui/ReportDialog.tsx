import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ReportDialog({ open, onOpenChange, onSubmit, loading }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (reason: string) => void;
  loading?: boolean;
}) {
  const [reason, setReason] = useState('');
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Pages.PostsFeed.ReportDialog.Title')}</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder={t('Pages.PostsFeed.ReportDialog.Description')}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className='my-4'
        />
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('Actions.Cancel')}
          </Button>
          <Button
            onClick={() => {
              onSubmit(reason);
              setReason('');
            }}
            loading={loading}
            disabled={!reason.trim()}
          >
            {t('Actions.Submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 