import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import CustomLegend from "./CustomLegend";

type ChartData = {
    minute: number;
    [key: string]: number | string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
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
