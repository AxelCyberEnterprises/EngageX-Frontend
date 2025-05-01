import { splitCamelCase } from "@/lib/utils";
import { LegendProps } from "recharts";

const CustomLegend = (props: LegendProps) => {
    const { payload } = props;

    if (!payload) return null;

    return (
        <div className="flex justify-center gap-4 pt-4">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-4 rounded-xs" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-independence">{splitCamelCase(entry.value as string)}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
