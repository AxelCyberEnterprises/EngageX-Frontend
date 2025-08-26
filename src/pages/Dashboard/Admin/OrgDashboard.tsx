import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { OrganizationTableData } from "@/components/tables/organization-table/data";
import { OrganizationsTable } from "@/components/tables/organization-table";
import AddOrganizationModal from "@/components/modals/modalVariants/AddOrganizationModal";
import { Button } from "@/components/ui/button";
import { useOrganizationList, usePatchOrganization } from "@/hooks/organization";
import { useQueryClient } from "@tanstack/react-query";

const OrganizationsDashboard = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const filterButtons = ["All", "Sport Organization", "Non-Sport Organization"];
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);
    const { data, isLoading } = useOrganizationList(debouncedSearch);
    const queryClient = useQueryClient();
    const patchOrg = usePatchOrganization();
    const [organizations, setOrganizations] = useState<OrganizationTableData[]>([]);

    useEffect(() => {
        if (data?.results) {
            const transformedOrgs: OrganizationTableData[] = data.results.map((org) => ({
                id: org.id.toString(),
                name: org.name,
                logo:
                    org.logo ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=cccccc&color=ffffff`,
                industryType: org.enterprise_type === "sport" ? "Sport Organization" : "Non-Sport Organization",
                members: org.user_count ?? 0,
                trainingStatus: org.is_active ? "Active" : "Blacklisted",
            }));
            setOrganizations(transformedOrgs);
        }
    }, [data]);

    const handleStatusChange = (organizationId: string, newStatus: "Active" | "Blacklisted") => {
        setOrganizations((prev) =>
            prev.map((org) => (org.id === organizationId ? { ...org, trainingStatus: newStatus } : org)),
        );

        patchOrg.mutate(
            {
                id: Number(organizationId),
                data: { is_active: newStatus === "Active" },
            },
            {
                onError: (error) => {
                    setOrganizations((prev) =>
                        prev.map((org) =>
                            org.id === organizationId
                                ? { ...org, trainingStatus: newStatus === "Active" ? "Blacklisted" : "Active" }
                                : org,
                        ),
                    );
                    console.error("Failed to update organization status:", error);
                },
                onSuccess: (updatedOrg) => {
                    setOrganizations((prev) =>
                        prev.map((org) =>
                            org.id === String(updatedOrg.id)
                                ? { ...org, trainingStatus: updatedOrg.is_active ? "Active" : "Blacklisted" }
                                : org,
                        ),
                    );
                },
            },
        );
    };

    const filteredData = organizations.filter((org) => {
        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Sport Organization" && org.industryType === "Sport Organization") ||
            (activeFilter === "Non-Sport Organization" && org.industryType === "Non-Sport Organization");

        return matchesFilter;
    });

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#ECEEF4]">
                <h1 className="font-medium text-xl md:text-xl text-[#333333] pl-3 md:pl-1">Organizations Dashboard</h1>
                <div className="flex items-center gap-3">
                    <div className="md:hidden">
                        <Search className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="hidden md:flex relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#262B3A]"
                            strokeWidth={1}
                        />
                        <input
                            type="text"
                            placeholder="Search Organization"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none w-54 font-light text-[#262B3A] placeholder:text-[#262B3A]"
                        />
                    </div>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#64BA9F] text-white rounded-md hover:bg-[#5aa88f] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Add organization</span>
                    </Button>
                </div>
            </div>
            <div className="flex gap-4 py-6">
                {filterButtons.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                            activeFilter === filter
                                ? "bg-black text-white"
                                : "bg-transparent text-gray-700 hover:bg-gray-200 shadow-[0px_1px_2px_1px_#0000001F]"
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="bg-white rounded-lg">
                <OrganizationsTable
                    data={filteredData}
                    pageSize={10}
                    hidePagination={false}
                    loadingOrganizations={isLoading}
                    onStatusChange={handleStatusChange}
                />
            </div>
            <AddOrganizationModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAddOrganizationSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ["organization-list"] });
                }}
            />
        </div>
    );
};

export { OrganizationsDashboard };
