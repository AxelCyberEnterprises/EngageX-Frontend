import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { OrganizationTableData } from '@/components/tables/organization-table/data';
import { OrganizationsTable } from '@/components/tables/organization-table';
import AddOrganizationModal from '@/components/modals/modalVariants/AddOrganizationModal';
import { Celtics, LakersLogo } from '@/assets/images/pngs';
import { Button } from '@/components/ui/button';

const OrganizationsDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Dummy data for organizations
  const dummyOrganizationsData: OrganizationTableData[] = [
    {
      id: "1",
      name: "Lakers",
      logo: LakersLogo,
      industryType: "Sport Organization",
      members: 80,
      trainingStatus: "Active",
    },
    {
      id: "2",
      name: "Warriors",
      logo: LakersLogo,
      industryType: "Sport Organization",
      members: 50,
      trainingStatus: "Active",
    },
    {
      id: "3",
      name: "Celtics",
      logo: Celtics,
      industryType: "Sport Organization",
      members: 35,
      trainingStatus: "Active",
    },
    {
      id: "4",
      name: "Axcel Cyber",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      industryType: "Non-Sport Organization",
      members: 80,
      trainingStatus: "Active",
    },
    {
      id: "5",
      name: "Chicago Bulls",
      logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&h=150&fit=crop",
      industryType: "Sport Organization",
      members: 25,
      trainingStatus: "Blacklisted",
    },
    {
      id: "6",
      name: "Veoc Tech",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      industryType: "Non-Sport Organization",
      members: 45,
      trainingStatus: "Active",
    },
    {
      id: "7",
      name: "Brooklyn",
      logo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&h=150&fit=crop",
      industryType: "Sport Organization",
      members: 90,
      trainingStatus: "Blacklisted",
    },
    {
      id: "8",
      name: "Nokia",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      industryType: "Non-Sport Organization",
      members: 10,
      trainingStatus: "Blacklisted",
    },
    {
      id: "9",
      name: "Wells Fargo",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      industryType: "Non-Sport Organization",
      members: 80,
      trainingStatus: "Active",
    },
    {
      id: "10",
      name: "Instagram",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      industryType: "Non-Sport Organization",
      members: 50,
      trainingStatus: "Active",
    },
  ];

  const filterButtons = ['All', 'Sport Organization', 'Non-sport Organization'];

  // Filter data based on active filter and search term
  const filteredData = dummyOrganizationsData.filter(org => {
    const matchesFilter = activeFilter === 'All' || 
      (activeFilter === 'Sport Organization' && org.industryType === 'Sport Organization') ||
      (activeFilter === 'Non-sport Organization' && org.industryType === 'Non-Sport Organization');
    
    const matchesSearch = searchTerm === '' || 
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#262B3A]" stroke-width={1}/>
            <input
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none w-64 font-light text-[#262B3A] placeholder:text-[#262B3A]"
            />
          </div>
          
          <Button className="hover:bg-transparent flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium transition-colors bg-[#fff]">
            <Filter className="w-4 h-4" />
            <span className="hidden md:inline">Filter</span>
          </Button>
          
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
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeFilter === filter
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
          loadingOrganizations={false}
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