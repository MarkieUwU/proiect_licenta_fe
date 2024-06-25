// src/pages/ErrorPage.tsx
import React from "react";

export const ErrorPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          We're sorry, something unexpected happened.
        </p>
        <p className="text-lg text-gray-600 mb-4">Please try again later.</p>
      </div>
    </div>
  );
};
