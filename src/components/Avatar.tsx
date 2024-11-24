import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface AvatarProps {
  image?: string;
  initials: string;
  size?: string;
}

export const AvatarComponent: React.FC<AvatarProps> = ({
  image,
  initials,
  size,
}) => {
  return (
    <Avatar className={size && "size-" + size}>
      {image?.length ? (
        <AvatarImage src={image}></AvatarImage>
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  );
};
