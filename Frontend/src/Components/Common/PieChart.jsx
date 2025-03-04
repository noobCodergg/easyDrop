import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "../../Components/ui/chart";


export function PieFormChart({customClass,lagendPosition,chartData,chartConfig}) {
  return (
    <Card className={`${customClass ? customClass : ""} flex flex-col pt-4 pr-4 ${lagendPosition === "bottom" ? "pb-4" : ""}`}>
      <CardHeader className="items-start p-0 pl-4">
        <CardTitle className="text-md max-sm:text-[10px] text-gray-700">Expense Budget</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart className="flex">
            <Pie
              data={chartData} 
              dataKey="value" 
              nameKey="category" 
              cx="50%" 
              cy="50%" 
              outerRadius={70} 
              fill="#8884d8" 
              // label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              <LabelList
              data={chartData}
                dataKey="value" 
                nameKey="value" 
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) =>
                  value + "%"
                }
              />
            </Pie>
            {
              lagendPosition === "right" ? (
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  verticalAlign={lagendPosition}
                  wrapperStyle={{ width: "fit-content", right: "0" }}
                />
              ) : (
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  verticalAlign={lagendPosition}
                  wrapperStyle={{ width: "fit-content", bottom: "0", left: "15px" }}
                />
              )
            }
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}