import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
