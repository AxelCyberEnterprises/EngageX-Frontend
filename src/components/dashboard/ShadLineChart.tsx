import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, LegendProps } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

type ChartData = {
    month: string;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
    isLoading?: boolean;
};

const CustomLegend = (props: LegendProps) => {
    const { payload } = props;
    if (!payload) return null;

    return (
        <div className="flex justify-center gap-4 pt-4">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-4 rounded-xs" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm" style={{ color: entry.color }}>
                        {entry.value === "Trigger" ? "Trigger Response" : entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function ShadLineChart({ data, colors, isLoading = false }: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = { label: key.charAt(0).toUpperCase() + key.slice(1), color: colors[key] };
        return acc;
    }, {} as ChartConfig);

    if (isLoading) {
        return (
            <Card className="bg-transparent shadow-none border-0 pb-0">
                <CardContent className="px-0">
                    <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-[200px] w-full rounded-md" />
                            <div className="flex justify-center gap-4 pt-4">
                                {Object.keys(colors).map((idx: any) => (
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
                    <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis width={25} tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Legend content={<CustomLegend />} />
                        {Object.keys(colors).map((key) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={colors[key]}
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