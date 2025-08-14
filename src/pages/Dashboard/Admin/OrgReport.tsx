import { useState } from 'react';
import { Search } from 'lucide-react';
import { OrganizationReportMember } from '@/components/tables/report-table/data';
import { OrganizationReportTable } from '@/components/tables/report-table';
import { EmailReportModal } from '@/components/modals/modalVariants/EmailReportModal';


const OrganizationReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showEmailModal, setShowEmailModal] = useState(false);

    // Dummy data for organization report members
    const dummyReportData: OrganizationReportMember[] = [
        {
            id: "1",
            name: "James Edward",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 16,
            totalSessionsGoal: 20,
            overallGoalCompletion: 80,
        },
        {
            id: "2",
            name: "Michelle Walters",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 4,
            totalSessionsGoal: 20,
            overallGoalCompletion: 20,
        },
        {
            id: "3",
            name: "Malik Bronson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 50,
        },
        {
            id: "4",
            name: "DeShawn Rivers",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 60,
        },
        {
            id: "5",
            name: 'Andre "Buckets" Wallace',
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 95,
        },
        {
            id: "6",
            name: "Kendrick Voss",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 50,
        },
        {
            id: "7",
            name: "Zion Blakely",
            avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 50,
        },
        {
            id: "8",
            name: "Trevon Hale",
            avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 50,
        },
        {
            id: "9",
            name: "Rico Stanton",
            avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 45,
        },
        {
            id: "10",
            name: "Damari Cross",
            avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&h=150&fit=crop&face=center",
            totalSessionsCompleted: 10,
            totalSessionsGoal: 20,
            overallGoalCompletion: 20,
        },
    ];

    // Filter data based on search term
    const filteredData = dummyReportData.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#EAECF0]">
                <h1 className="font-medium text-2xl text-[#101828]">Organization Report</h1>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
                        <input
                            type="text"
                            placeholder="Search Member"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-[#D0D5DD] rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none w-64 text-sm"
                        />
                    </div>

                    <button
                        className="bg-[#fff] flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
                    >
                        Download Report
                    </button>

                    <button
                        onClick={() => setShowEmailModal(true)}
                        className="bg-[#fff] flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#344054] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
                    >
                        Email Report
                    </button>
                </div>
            </div>

            {/* Report Table */}
            <div className="mt-6">
                <OrganizationReportTable data={filteredData} pageSize={10} hidePagination={false} isLoading={false} />
            </div>
            {showEmailModal && <EmailReportModal show={showEmailModal} onClose={() => setShowEmailModal(false)} />}
        </div>
    );
};

export { OrganizationReport };