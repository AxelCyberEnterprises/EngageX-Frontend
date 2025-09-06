import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import CustomLegend from "./CustomLegend";

type ChartData = {
    month: number; // in seconds
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
    isLoading?: boolean;
};

// Utility to format seconds to "Xs" or "Xm"
const formatTimeLabel = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = +(seconds / 60).toFixed(1);
    return `${minutes}m`;
};

export default function ShadLineChart2({ data, colors, isLoading = false }: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            color: colors[key],
        };
        return acc;
    }, {} as ChartConfig);

    const rawValues = data.map((d) => d.month);
    const maxRaw = Math.max(...rawValues);

    // Create an initial data point at x=0
    const firstPoint = data[0] || {};
    const initialPoint: ChartData = {
        month: 0,
        raw: 0,
        xLabel: formatTimeLabel(0),
    };
    Object.keys(colors).forEach((key) => {
        initialPoint[key] = firstPoint[key] ?? 0;
    });

    const dataWithTime = [
        initialPoint,
        ...data.map((d) => ({
            ...d,
            raw: d.month,
            xLabel: formatTimeLabel(d.month),
        })),
    ];

    // Define custom ticks
    const tickInterval = 10;
    const customTicks: number[] = [];
    for (let i = 0; i <= maxRaw; i += tickInterval) {
        customTicks.push(i);
    }

    if (isLoading) {
        return (
            <Card className="bg-transparent shadow-none border-0 pb-0">
                <CardContent className="px-0">
                    <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-[200px] w-full rounded-md" />
                            <div className="flex justify-center gap-4 pt-4">
                                {Object.keys(colors).map((idx) => (
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
                    <LineChart data={dataWithTime} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="raw"
                            type="number"
                            domain={[0, maxRaw]}
                            ticks={customTicks}
                            tickFormatter={(value) => (value === 0 ? "" : formatTimeLabel(value))}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis width={25} tickLine={false} axisLine={false} tickMargin={8} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelFormatter={(label) => {
                                        const minutes = Math.floor(label / 60);
                                        const seconds = label % 60;
                                        return `${minutes}m ${seconds}s`;
                                    }}
                                />
                            }
                        />
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
