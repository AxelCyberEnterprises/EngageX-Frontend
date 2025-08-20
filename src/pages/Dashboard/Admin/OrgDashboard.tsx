import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { OrganizationTableData } from '@/components/tables/organization-table/data';
import { OrganizationsTable } from '@/components/tables/organization-table';
import AddOrganizationModal from '@/components/modals/modalVariants/AddOrganizationModal';
import { Button } from '@/components/ui/button';
import { useOrganizationList } from '@/hooks/organization';

const OrganizationsDashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const filterButtons = ["All", "Sport Organization", "Non-Sport Organization"];

  const { data, isLoading } = useOrganizationList();

  const [organizations, setOrganizations] = useState<OrganizationTableData[]>([]);

  useEffect(() => {
    if (data?.results) {
      const transformedOrgs: OrganizationTableData[] = data.results.map((org) => ({
        id: org.id.toString(),
        name: org.name,
        logo:
          org.logo ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(org.name)}&background=cccccc&color=ffffff`,
        industryType:
          org.enterprise_type === "sport"
            ? "Sport Organization"
            : "Non-Sport Organization",
        members: org.available_verticals.length ?? 0,
        trainingStatus: org.is_active ? "Active" : "Blacklisted",
      }));
      setOrganizations(transformedOrgs);
    }
  }, [data]);

  // Handle status change
  const handleStatusChange = async (organizationId: string, newStatus: 'Active' | 'Blacklisted') => {
    try {
      // Update local state immediately for better UX
      setOrganizations(prev => 
        prev.map(org => 
          org.id === organizationId 
            ? { ...org, trainingStatus: newStatus }
            : org
        )
      );

      // TODO: Make API call to update status on backend
      // Example:
      // await updateOrganizationStatus(organizationId, newStatus === 'Active');
      
      console.log(`Updated organization ${organizationId} status to ${newStatus}`);
    } catch (error) {
      // Revert the change if API call fails
      setOrganizations(prev => 
        prev.map(org => 
          org.id === organizationId 
            ? { ...org, trainingStatus: newStatus === 'Active' ? 'Blacklisted' : 'Active' }
            : org
        )
      );
      console.error('Failed to update organization status:', error);
    }
  };

  // Filtered organizations
  const filteredData = organizations.filter((org) => {
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Sport Organization" &&
        org.industryType === "Sport Organization") ||
      (activeFilter === "Non-Sport Organization" &&
        org.industryType === "Non-Sport Organization");

    const matchesSearch =
      searchTerm === "" ||
      org.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#ECEEF4]">
        <h1 className="font-medium text-xl md:text-xl text-[#333333] pl-3 md:pl-1">
          Organizations Dashboard
        </h1>

        <div className="flex items-center gap-3">
          {/* Search - Mobile only */}
          <div className="md:hidden">
            <Search className="w-5 h-5 text-gray-500" />
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#262B3A]" strokeWidth={1} />
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

      {/* Filter Tabs */}
      <div className="flex gap-4 py-6">
        {filterButtons.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${activeFilter === filter
              ? 'bg-black text-white'
              : 'bg-transparent text-gray-700 hover:bg-gray-200 shadow-[0px_1px_2px_1px_#0000001F]'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Organizations Table */}
      <div className="bg-white rounded-lg">
        <OrganizationsTable
          data={filteredData}
          pageSize={10}
          hidePagination={false}
          loadingOrganizations={isLoading}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Add Organization Modal */}
      <AddOrganizationModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export { OrganizationsDashboard };