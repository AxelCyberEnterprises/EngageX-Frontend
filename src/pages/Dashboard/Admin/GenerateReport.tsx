import { useState } from 'react';
import { Search } from 'lucide-react';
import { GenerateReportMember } from '@/components/tables/generate-report-table/data';
import { GenerateReportTable } from '@/components/tables/generate-report-table';
import { Link } from 'react-router-dom';

const GenerateReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState<GenerateReportMember[]>([]);
    const dummyReportData: GenerateReportMember[] = [
        {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            role: "Manager",
            assignedGoals: ["Rookie", "Presentation"],
            email: "johndoe@acme.com",
        },
        {
            id: "2",
            firstName: "Jane",
            lastName: "Doe",
            role: "Admin",
            assignedGoals: ["Rookie", "Presentation"],
            email: "janedoe@acme.com",
        },
        {
            id: "3",
            firstName: "Christopher",
            lastName: "Emmanuel",
            role: "User",
            assignedGoals: ["Rookie", "Presentation"],
            email: "christopheremmanuel@acme.com",
        },
        {
            id: "4",
            firstName: "Nk",
            lastName: "Harrison",
            role: "User",
            assignedGoals: ["Rookie", "Presentation"],
            email: "nkharrison@acme.com",
        },
        {
            id: "5",
            firstName: "Jane",
            lastName: "Smith",
            role: "Manager",
            assignedGoals: ["Rookie", "Presentation"],
            email: "janesmith@acme.com",
        },
        {
            id: "6",
            firstName: "Adams",
            lastName: "Smith",
            role: "Admin",
            assignedGoals: ["Rookie", "Presentation"],
            email: "adamssmith@acme.com",
        },
        {
            id: "7",
            firstName: "John",
            lastName: "Doe",
            role: "Manager",
            assignedGoals: ["Rookie", "Presentation"],
            email: "johndoe@acme.com",
        },
        {
            id: "8",
            firstName: "Christopher",
            lastName: "Emmanuel",
            role: "User",
            assignedGoals: ["Rookie", "Presentation"],
            email: "christopheremmanuel@acme.com",
        },
        {
            id: "9",
            firstName: "Jane",
            lastName: "Smith",
            role: "Manager",
            assignedGoals: ["Rookie", "Presentation"],
            email: "janesmith@acme.com",
        },
    ];

    // Filter data based on search term
    const filteredData = dummyReportData.filter(member =>
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleGenerateReport = () => {
        // Handle generate report functionality
        console.log('Generating report...');
    };

    return (
        <div className="px-6 pb-8 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EAECF0]">
                <h3 className="font-medium md:text-3xl text-lg sm:text-xl text-[#101828] py-4 md:pl-6 pl-3 ">
                    Progress Report
                </h3>

                <div className="flex items-center gap-3">
                    {selectedRows.length > 0 ? (
                        <Link
                            to="/dashboard/admin/organization/report"
                            onClick={handleGenerateReport}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] text-white hover:bg-[#059669] transition-colors font-medium text-sm"
                        >
                            Generate Report
                        </Link>
                    ) : (
                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed font-medium text-sm"
                        >
                            Generate Report
                        </div>
                    )}

                </div>
            </div>

            {/* Search */}
            <div className="mt-6 mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-[#D0D5DD] rounded-sm outline-none w-[60%] text-xs font-light"
                    />
                </div>
            </div>

            {/* Report Table */}
            <div>
                <GenerateReportTable
                    data={filteredData}
                    pageSize={10}
                    hidePagination={false}
                    isLoading={false}
                    setSelectedRows={setSelectedRows}
                />
            </div>
        </div>
    );
};

export { GenerateReport };