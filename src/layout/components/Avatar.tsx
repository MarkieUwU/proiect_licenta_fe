import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import React from 'react';

interface AvatarProps {
  image?: string;
  initials: string;
  size?: number;
}

export const AvatarComponent: React.FC<AvatarProps> = ({
  image,
  initials,
  size,
}) => {
  return (
    <Avatar style={size ? { width: size, height: size } : {}}>
      {image?.length ? (
        <AvatarImage src={image}></AvatarImage>
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
};
