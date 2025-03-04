import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../Components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../Components/ui/select";

const chartData = [
  { month: "January", desktop: 5000 },
  { month: "February", desktop: 8000 },
  { month: "March", desktop: 12000 },
  { month: "April", desktop: 10000 },
  { month: "May", desktop: 16000 },
  { month: "June", desktop: 15000 },
  { month: "July", desktop: 22000 },
  { month: "August", desktop: 21000 },
  { month: "September", desktop: 27000 },
  { month: "October", desktop: 26000 },
  { month: "November", desktop: 32000 },
  { month: "December", desktop: 45000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FC71B6",
  },
};

export function AreaFormChart({ customClass, selectItems, title }) {
  const [filterYear, setFilterYear] = useState("");

  return (
    <Card className={`${customClass ? customClass : ""} px-2 pb-4 pt-1 lg:col-span-2 h-fit`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 mb-4 p-2">
        <CardTitle className="text-md max-sm:text-[10px] text-gray-700 max-w-[140px]">
          {title}
        </CardTitle>
        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="w-fit h-5 bg-gray-200">{filterYear || "Select"}</SelectTrigger>
          <SelectContent>
            {selectItems?.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="p-0 pb-6 h-full flex justify-center">
        <ChartContainer config={chartConfig} className="w-full max-h-[250px] aspect-[4/3]">
          <AreaChart data={chartData} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
