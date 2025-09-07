import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import CustomLegend from "./CustomLegend";

type ChartData = {
    label: string; // date label like "Aug 1", "Sep 1"
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
    isLoading?: boolean;
};

export default function ShadLineChart({ data, colors, isLoading = false }: Props) {
    // Get all unique categories from the data, or use color keys as fallback
    const allCategories = new Set<string>();

    if (data && data.length > 0) {
        data.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (key !== "label" && typeof item[key] === "number") {
                    allCategories.add(key);
                }
            });
        });
    }

    // If no data, use the color keys as categories for consistent chart structure
    if (allCategories.size === 0) {
        Object.keys(colors).forEach((key) => allCategories.add(key));
    }

    // Create chart config for all categories
    const chartConfig = Array.from(allCategories).reduce((acc, key) => {
        acc[key] = {
            label: key,
            color: colors[key] || "#8884d8", // fallback color if not defined
        };
        return acc;
    }, {} as ChartConfig);

    // Create empty data structure if no data exists
    const hasData = data && data.length > 0;
    const emptyDataPoint = Array.from(allCategories).reduce(
        (acc, category) => {
            acc[category] = 0;
            return acc;
        },
        { label: "No Data" } as ChartData,
    );

    // Ensure all data points have all categories (fill with 0 if missing)
    const normalizedData = hasData
        ? data.map((item) => {
              const normalized = { ...item };
              allCategories.forEach((category) => {
                  if (!(category in normalized)) {
                      normalized[category] = 0;
                  }
              });
              return normalized;
          })
        : [emptyDataPoint]; // Show empty state with proper structure

    if (isLoading) {
        return (
            <Card className="bg-transparent shadow-none border-0 pb-0">
                <CardContent className="px-0">
                    <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-[200px] w-full rounded-md" />
                            <div className="flex justify-center gap-4 pt-4">
                                {Array.from(allCategories).map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <Skeleton className="w-1.5 h-4" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-transparent shadow-none border-0 pb-0">
            <CardContent className="px-0">
                <ChartContainer config={chartConfig}>
                    <LineChart data={normalizedData} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis width={25} tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" labelFormatter={(label) => label} />}
                        />

                        <Legend content={<CustomLegend />} />
                        {Array.from(allCategories).map((category) => (
                            <Line
                                key={category}
                                dataKey={category}
                                type="monotone"
                                stroke={colors[category] || "#8884d8"}
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
