import { CartesianGrid, Line, LineChart, XAxis, Legend, YAxis, LegendProps } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
    minute: number;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
};

function splitCamelCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}

const CustomLegend = (props: LegendProps) => {
    const { payload } = props;
    if (!payload) return null;

    return (
        <div className="flex justify-center gap-4 pt-4">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-4 rounded-xs" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm" style={{ color: entry.color }}>
                        {splitCamelCase(entry.value as string)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function ShadLinearLineChart({ data, colors }: Props) {
    const chartConfig = Object.keys(colors).reduce((acc, key) => {
        acc[key] = {
            label: key.replace(/([a-z])([A-Z])/g, "$1 $2"),
            color: colors[key],
        };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="bg-transparent shadow-none border-0 pb-0">
            <CardContent className="px-0">
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="minute"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => (value === 0 ? "" : value)}
                        />
                        <YAxis
                            width={25}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => (value === 0 ? "" : value)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Legend content={<CustomLegend />} />
                        {Object.keys(colors).map((key) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="linear"
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
