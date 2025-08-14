import { ColumnDef } from "@tanstack/react-table";
import { OrganizationReportMember } from "./data";
import SegmentedProgressBar from "@/components/dashboard/SegmentedProgressBar";

export const columns: ColumnDef<OrganizationReportMember, any>[] = [
    {
        accessorKey: "member",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Member
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center gap-3 py-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <span className="text-[#101828] font-medium text-sm">{member.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "totalSessionsCompleted",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Total Sessions Completed
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="text-[#101828] font-medium text-sm py-4">
                    {member.totalSessionsCompleted} out of {member.totalSessionsGoal}
                </div>
            );
        },
    },
    {
        accessorKey: "overallGoalCompletion",
        header: () => (
            <div className="flex items-center text-[#667085] text-sm font-medium py-3">
                Overall Goal Completion
            </div>
        ),
        cell: ({ row }) => {
            const member = row.original;
            return (
                <div className="flex items-center gap-4 py-4 pr-6">
                    <div className="flex-1">
                        <SegmentedProgressBar
                            percent={member.overallGoalCompletion}
                            color="#10B981"
                            divisions={1}
                            height="12px"
                        />
                    </div>
                    <span className="text-[#667085] font-medium text-sm min-w-[3rem] text-right">
                        {member.overallGoalCompletion}%
                    </span>
                </div>
            );
        },
    },
];