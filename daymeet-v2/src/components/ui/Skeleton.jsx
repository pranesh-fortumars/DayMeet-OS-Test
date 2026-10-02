import React from 'react';

export default function Skeleton({ className, ...props }) {
  return (
    <div 
      className={`animate-pulse rounded-md bg-[#E5E8F5] dark:bg-slate-700/50 ${className}`} 
      {...props} 
    />
  );
}

export function SkeletonCircle({ className, ...props }) {
  return (
    <div 
      className={`animate-pulse rounded-full bg-[#E5E8F5] dark:bg-slate-700/50 ${className}`} 
      {...props} 
    />
  );
}
