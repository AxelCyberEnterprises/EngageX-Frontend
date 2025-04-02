import { Area, AreaChart, CartesianGrid, Legend, XAxis, LegendProps, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
    month: string;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
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
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function ShadAreaChart({ data, colors }: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = { label: key.charAt(0).toUpperCase() + key.slice(1), color: colors[key] };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="bg-transparent shadow-none border-0 pb-0">
            <CardContent className="px-0">
                <ChartContainer config={chartConfig}>
                    <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
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
                        <defs>
                            {Object.keys(colors).map((key) => (
                                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors[key]} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors[key]} stopOpacity={0.1} />
                                </linearGradient>
                            ))}
                        </defs>
                        {Object.keys(colors).map((key) => (
                            <Area
                                key={key}
                                dataKey={key}
                                type="natural"
                                fill={`url(#fill${key})`}
                                fillOpacity={0.4}
                                stroke={colors[key]}
                                stackId="a"
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
