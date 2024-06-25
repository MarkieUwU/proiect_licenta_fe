import React from "react";

interface NoRecordsProps {
  title?: string;
  text?: string;
}

const NoRecordsFound: React.FC<NoRecordsProps> = ({
  title = "No Records Found",
  text,
}) => {
  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      {!text ? null : <p className="text-gray-500">{text}</p>}
    </div>
  );
};

export default NoRecordsFound;
