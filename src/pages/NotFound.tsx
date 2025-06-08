
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-12">
        <h1 className="text-9xl font-bold text-portfolio-purple">404</h1>
        <h2 className="text-3xl font-bold text-portfolio-darkPurple mt-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button 
          className="mt-8 bg-portfolio-purple hover:bg-portfolio-purple/90 inline-flex items-center"
          asChild
        >
          <Link to="/">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
