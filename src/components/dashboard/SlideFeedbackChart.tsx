import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import CustomLegend from "./CustomLegend";

export default function SlideFeedbackChart() {
    // Sample data for 8 slides
    const [data] = useState([
        { name: "Slide 1", targetTime: 2, timeSpent: 1 },
        { name: "Slide 2", targetTime: 3, timeSpent: 4 },
        { name: "Slide 3", targetTime: 5, timeSpent: 3.7 },
        { name: "Slide 4", targetTime: 3, timeSpent: 4 },
        { name: "Slide 5", targetTime: 5, timeSpent: 4.5 },
        { name: "Slide 6", targetTime: 3, timeSpent: 3.3 },
        { name: "Slide 7", targetTime: 2, timeSpent: 3.5 },
        { name: "Slide 8", targetTime: 1, timeSpent: 4 },
    ]);

    const chartConfig = {
        targetTime: {
            label: "Target time",
            color: "#F4CFA0",
        },
        timeSpent: {
            label: "Time spent per slide",
            color: "#F5B546",
        },
    } satisfies ChartConfig;

    return (
        <Card className="bg-transparent shadow-none border-0 pb-0">
            <CardContent className="px-0">
                <ChartContainer config={chartConfig} className="h-100 w-full">
                    <AreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12, top: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                        <YAxis domain={[0, "dataMax"]} tickCount={6} width={25} tickLine={false} axisLine={false} tickMargin={15} />
                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                        <Legend content={<CustomLegend />} />
                        <defs>
                            <linearGradient id="topAreaGradient" x1="0" y1="1" x2="0" y2="0">
                                <stop offset="15.39%" stopColor="rgba(245, 181, 70, 0.03)" />
                                <stop offset="101.37%" stopColor="rgba(245, 181, 70, 0.2)" />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="targetTime"
                            stroke="#F4CFA0"
                            strokeWidth={1.5}
                            strokeDasharray="10 10"
                            fill="transparent"
                            name="Target time"
                            activeDot={{ r: 5, stroke: "#F5B546", strokeWidth: 1.5, fill: "#FFFFFF" }}
                        />
                        <Area
                            dataKey="timeSpent"
                            stroke="#F5B546"
                            strokeWidth={1.5}
                            fill="url(#topAreaGradient)"
                            fillOpacity={0.8}
                            name="Time spent per slide"
                            activeDot={{ r: 5, stroke: "#F5B546", strokeWidth: 1.5, fill: "#FFFFFF" }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
