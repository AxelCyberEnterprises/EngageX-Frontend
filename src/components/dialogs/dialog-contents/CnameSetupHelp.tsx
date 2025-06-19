import { Button } from "@/components/ui/button";
import { Bolt, Download } from "lucide-react";

const CnameSetupHelp = () => {
    const cnameDetails = {
        Type: "CNAME",
        Name: "portal",
        Value: "white-label.engagex.app",
    };

    return (
        <div className="flex flex-col justify-between gap-6">
            <div className="space-y-6">
                <div className="p-2 border border-bright-gray rounded-md size-fit">
                    <Bolt className="size-5" />
                </div>
                <div className="space-y-2">
                    <h6>CNAME Setup Help</h6>
                    <p className="text-independence">Sample DNS entry</p>
                    <div className="bg-[#F3F4F6] p-2.5 rounded-md grid gap-2">
                        {Object.entries(cnameDetails).map(([key, value], index) => (
                            <p key={key + index} className="inline-flex items-center gap-2 text-sm">
                                <span>{key}:</span>
                                <span>{value}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <Button
                    variant="outline"
                    className="text-[#344054] hover:text-[#344054] hover:bg-[#F3F4F6] font-normal"
                >
                    <Download className="size-4" /> Download PDF Guide
                </Button>
            </div>
        </div>
    );
};

export default CnameSetupHelp;
