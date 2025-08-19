import { useState } from 'react';
import { Search } from 'lucide-react';
import { GenerateReportMember } from '@/components/tables/generate-report-table/data';
import { GenerateReportTable } from '@/components/tables/generate-report-table';
import { Link } from 'react-router-dom';

const GenerateReport = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState<GenerateReportMember[]>([]);
    const searchParams = new URLSearchParams(location.search);
    const orgId = Number(searchParams.get("id"));

    // Filter data based on search term
    // const filteredData = dummyReportData.filter(member =>
    //     member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     member.email.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const generateReportUrl = () => {
        const ids = selectedRows.map(row => row.id).join(',');
        return `/dashboard/admin/organization/report?id=${orgId}&ids=${ids}`;
    };

    return (
        <div className="px-6 pb-8 bg-white min-h-screen">
            <div className="flex items-center justify-between border-b border-[#EAECF0]">
                <h3 className="font-medium md:text-3xl text-lg sm:text-xl text-[#101828] py-4 md:pl-6 pl-3 ">
                    Progress Report
                </h3>

                <div className="flex items-center gap-3">
                    {selectedRows.length > 0 ? (
                        <Link
                            to={generateReportUrl()}
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

            <GenerateReportTable
                orgId={orgId}
                setSelectedRows={setSelectedRows}
            />
        </div>
    );
};

export { GenerateReport };