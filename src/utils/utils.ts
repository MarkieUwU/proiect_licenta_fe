export const getInitials = (name: string): string => {
  let words: string[] = name.split(/[ .\-_]/g);
  let initials = "";

  if (!words?.length) return initials;

  words = words.slice(0, 2);

  words.forEach((name) => {
    initials += name.at(0)?.toUpperCase();
  });

  return initials;
};
