// src/pages/HomePage.tsx
import React from 'react';
import SuggestionsSidebar from '../../../../layout/components/SuggestionsSidebar';
import '@/modules/Posts/pages/HomePage/HomePage.css';
import { PostsFeed } from '../../components/PostsFeed';

const HomePage: React.FC = () => {
  return (
    <div className='flex h-full pt-6'>
      <div className="w-0 lg:w-1/3"></div>
      <PostsFeed />
      <SuggestionsSidebar />
    </div>
  );
};

export default HomePage;
