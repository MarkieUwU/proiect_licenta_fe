import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  image?: string;
  initials: string;
}

export const AvatarComponent: React.FC<AvatarProps> = ({ image, initials }) => {
  return (
    <Avatar>
      {image?.length ? (
        <AvatarImage src={image}></AvatarImage>
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
};
