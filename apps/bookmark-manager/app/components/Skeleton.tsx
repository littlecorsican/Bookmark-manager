import React from 'react';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  height = "h-4", 
  width = "w-full" 
}) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
    />
  );
};

export const BookmarkSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow animate-pulse">
      <div className="flex items-start space-x-4">
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex-shrink-0 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-3" />
      <div className="flex flex-wrap gap-2 mb-3">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export const TagSkeleton: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
      <Skeleton className="h-6 w-18 rounded-full" />
    </div>
  );
};

export default Skeleton; 