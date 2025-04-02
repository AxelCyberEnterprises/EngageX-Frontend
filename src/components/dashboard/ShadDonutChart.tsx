import { Pie, PieChart, Sector } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type ChartData = {
    name: string;
    value: number;
    fill: string;
};

type Props = {
    data: ChartData[];
    colors: Record<string, string>;
};

export default function ShadDonutChart({ data, colors }: Props) {
    const chartConfig = data.reduce((acc, item) => {
        acc[item.name] = { label: item.name, color: colors[item.name] || item.fill };
        return acc;
    }, {} as ChartConfig);

    return (
        <Card className="flex flex-col shadow-none border-0">
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={30}
                            strokeWidth={5}
                            activeIndex={0}
                            activeShape={({ outerRadius = 0, ...props }) => (
                                <Sector {...props} outerRadius={outerRadius + 10} />
                            )}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
