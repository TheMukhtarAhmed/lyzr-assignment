import { Progress } from "@heroui/react";
import React from "react";
import "react-circular-progressbar/dist/styles.css";

interface CustomLinearPercentIndicatorProps {
  percent: number;
  value?: number | string;
  unit?: string;
  title?: string;
  indicatorColor: string;
  trackColor?: string;
  trackHeight?: string;
  size?: number;
}

const CustomLinearPercentIndicator: React.FC<
  CustomLinearPercentIndicatorProps
> = ({
  percent,
  value,
  unit,
  title,
  trackColor,
  indicatorColor = "#E6F5EB",
  trackHeight = "h-2.5",
}) => {
  return (
    <div className="!w-full">
      <div className="flex justify-center items-center flex-col gap-2">
        {value && (
          <span className="text-sm font-semibold text-gray-800">
            {value} {unit}
          </span>
        )}
        <Progress
          classNames={{
            base: "max-w-md",
            track: `${trackColor} ${trackHeight}`,
            indicator: `${indicatorColor}`,
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          value={percent}
          size="md"
        />
        {title && <span className="text-xs text-gray-500">{title}</span>}
      </div>
    </div>
  );
};

export default CustomLinearPercentIndicator;
