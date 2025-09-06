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

    // Function to generate 7 days of data ensuring we have at least 7 days
    const generateSevenDaysData = () => {
        const hasData = data && data.length > 0;

        if (!hasData) {
            // Generate 7 days from today backwards
            const sevenDaysData: ChartData[] = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const label = date.toLocaleDateString(undefined, { day: "numeric", month: "short" });

                const dataPoint: ChartData = { label };
                allCategories.forEach((category) => {
                    dataPoint[category] = 0;
                });
                sevenDaysData.push(dataPoint);
            }
            return sevenDaysData;
        }

        // Create a map of existing data by label
        const existingDataMap = new Map<string, ChartData>();
        data.forEach((item) => {
            existingDataMap.set(item.label, item);
        });

        // Determine date range - if we have data, use it to determine the range
        let startDate: Date;
        let endDate: Date;

        if (data.length > 0) {
            // Parse the existing dates to find the range
            const dates = data
                .map((item) => {
                    // Parse "Aug 1", "Sep 1" etc.
                    const [month, day] = item.label.split(" ");
                    const currentYear = new Date().getFullYear();
                    return new Date(`${month} ${day}, ${currentYear}`);
                })
                .sort((a, b) => a.getTime() - b.getTime());

            startDate = dates[0];
            endDate = dates[dates.length - 1];

            // Ensure we have at least 7 days
            const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff < 6) {
                // Extend the range to cover 7 days
                const totalExtension = 6 - daysDiff;
                const extensionBefore = Math.floor(totalExtension / 2);
                const extensionAfter = totalExtension - extensionBefore;

                startDate.setDate(startDate.getDate() - extensionBefore);
                endDate.setDate(endDate.getDate() + extensionAfter);
            }
        } else {
            // Fallback to last 7 days
            endDate = new Date();
            startDate = new Date();
            startDate.setDate(endDate.getDate() - 6);
        }

        // Generate complete 7+ days dataset
        const completeData: ChartData[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const label = currentDate.toLocaleDateString(undefined, { day: "numeric", month: "short" });
            const existingData = existingDataMap.get(label);

            if (existingData) {
                // Use existing data, but ensure all categories are present
                const normalized = { ...existingData };
                allCategories.forEach((category) => {
                    if (!(category in normalized)) {
                        normalized[category] = 0;
                    }
                });
                completeData.push(normalized);
            } else {
                // Create empty data point for missing dates
                const dataPoint: ChartData = { label };
                allCategories.forEach((category) => {
                    dataPoint[category] = 0;
                });
                completeData.push(dataPoint);
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return completeData;
    };

    const normalizedData = generateSevenDaysData();

    if (isLoading) {
        return (
            <Card className="bg-transparent shadow-none border-0 pb-0">
                <CardContent className="px-0">
                    <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <div className="space-y-2">
                            <Skeleton className="h-[200px] w-full rounded-md" />
                            <div className="flex justify-center gap-4 pt-4">
                                {Array.from(allCategories).map((_category, idx) => (
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
