import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

interface AvatarProps {
  image?: string;
  initials?: string;
  className?: string;
}

export const AvatarComponent: React.FC<AvatarProps> = ({
  image,
  initials,
  className
}) => {
  return (
    <Avatar
      className={className}
    >
      {image?.length ? (
        <AvatarImage src={image}></AvatarImage>
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
};
