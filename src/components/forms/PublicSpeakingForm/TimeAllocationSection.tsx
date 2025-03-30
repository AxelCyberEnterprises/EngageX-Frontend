import { Clock } from "lucide-react";

const TimeAllocationSection = () => {
    return (
        <section className="space-y-4">
            <div className="space-y-2">
                <h6>Time Allocation</h6>
                <p className="text-auro-metal-saurus">Time allocated for this session is fixed</p>
            </div>
            <div className="flex items-center justify-between bg-[#F8F9FC] border border-bright-gray p-3 rounded-lg">
                <div className="flex items-center gap-x-2">
                    <Clock className="size-4" />
                    <span className="text-sm text-independence">Total Time</span>
                </div>
                <span className="text-sm text-green-sheen">30 minutes</span>
            </div>
        </section>
    );
};

export default TimeAllocationSection;
