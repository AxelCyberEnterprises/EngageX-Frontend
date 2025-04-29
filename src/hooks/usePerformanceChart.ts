import { ISession } from "@/types/sessions";

interface IPerformanceChart {
    performanceAnalytics?: ISession["performance_analytics"];
}

const usePerformanceChart = ({ performanceAnalytics }: IPerformanceChart) => {
    function applyChunkOffset(arr: ISession["performance_analytics"], chunkSize = 7, offset = 4) {
        return arr.map((item, index) => {
            const chunkOffset = (index + offset) * chunkSize;

            return {
                ...item,
                chunk_offset: chunkOffset, // you can name this anything
                impact: item.impact,
                trigger: item.trigger_response,
                conviction: item.conviction,
            };
        });
    }

    const chartColors = {
        Impact: "#252A39",
        Trigger: "#40B869",
        Conviction: "#F5B546",
    };

    const chartData = applyChunkOffset(performanceAnalytics || [], 7);

    return { chartColors, chartData };
};

export default usePerformanceChart;
