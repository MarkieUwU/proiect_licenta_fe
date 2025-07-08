import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AdminPosts from '../components/content-management/AdminPosts';
import AdminComments from '../components/content-management/AdminComments';
import AdminReports from './AdminReports';
import { useTranslation } from 'react-i18next';

export default function ContentManagement() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('posts');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">{t('Pages.Admin.ContentManagement.Title')}</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="posts">{t('Pages.Admin.ContentManagement.Tabs.Posts')}</TabsTrigger>
          <TabsTrigger value="comments">{t('Pages.Admin.ContentManagement.Tabs.Comments')}</TabsTrigger>
          <TabsTrigger value="reports">{t('Pages.Admin.ContentManagement.Tabs.Reports')}</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="posts">
            <AdminPosts />
          </TabsContent>
          <TabsContent value="comments">
            <AdminComments />
          </TabsContent>
          <TabsContent value="reports">
            <AdminReports />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 