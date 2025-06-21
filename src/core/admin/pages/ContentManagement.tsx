import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AdminPosts from '../components/content-management/AdminPosts';
import AdminComments from '../components/content-management/AdminComments';

export default function ContentManagement() {
  const [tab, setTab] = useState('posts');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="posts">
            <AdminPosts />
          </TabsContent>
          <TabsContent value="comments">
            <AdminComments />
          </TabsContent>
          {/* <TabsContent value="reports">
            <AdminReports />
          </TabsContent> */}
        </div>
      </Tabs>
    </div>
  );
} 