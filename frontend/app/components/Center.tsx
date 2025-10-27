import React from "react";

interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  isVertical?: boolean;
  flexWrap?: boolean;
  children: React.ReactNode;
}

export function Center({
  isVertical = false,
  flexWrap = false,
  className = "",
  children,
  ...props
}: CenterProps) {
  const flexDirectionClass = isVertical ? "flex-col" : "";
  const flexWrapClass = flexWrap ? "flex-wrap" : "";
  return (
    <div
      {...props}
      className={`w-full flex ${flexDirectionClass} ${flexWrapClass} items-center ${className}`}
    >
      {children}
    </div>
  );
}