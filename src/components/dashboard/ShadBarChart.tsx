import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import CustomLegend from "./CustomLegend";

type ChartData = {
    category: string;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
    isLoading?: boolean;
    barSize?: number;
    barGap?: number;
    height?: number;
};

export default function ShadBarChart({ 
    data, 
    colors, 
    isLoading = false, 
    barSize = 20, 
    barGap = 2,
    height = 300
}: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            color: colors[key],
        };
        return acc;
    }, {} as ChartConfig);

    const metricKeys = Object.keys(colors);

    if (isLoading) {
        return (
            <Card className="bg-transparent shadow-none border-0 pb-0">
                <CardContent className="px-0">
                    <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-[300px] w-full rounded-md" />
                            <div className="flex justify-center gap-4 pt-4">
                                {metricKeys.map((key) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <Skeleton className="w-4 h-4" />
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
                    <BarChart 
                        data={data} 
                        margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
                        height={height}
                        barCategoryGap={`${barGap}%`}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis 
                            dataKey="category" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={8}
                            height={50}
                            angle={data.length > 5 ? -45 : 0}
                            textAnchor={data.length > 5 ? 'end' : 'middle'}
                        />
                        <YAxis 
                            width={40} 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={8} 
                        />
                        <ChartTooltip
                            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                />
                            }
                        />
                        <Legend content={<CustomLegend />} />
                        
                        {metricKeys.map((key) => (
                            <Bar 
                                key={key}
                                dataKey={key}
                                fill={colors[key]}
                                barSize={barSize}
                                // Add animation
                                animationDuration={1000}
                                animationEasing="ease-out"
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}