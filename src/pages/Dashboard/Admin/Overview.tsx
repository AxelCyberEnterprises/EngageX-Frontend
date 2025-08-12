
import coaching from '../../../assets/images/svgs/coaching.svg';
import archive from '../../../assets/images/svgs/archive.svg';
import lakers from '../../../assets/images/pngs/lakers.png';
import { Member } from '@/components/tables/members-table/data';
import { MembersTable } from '@/components/tables/members-table';
import { Goal } from '@/components/tables/active-goals-table/data';
import { GoalsTable } from '@/components/tables/active-goals-table';
import { PlusIcon, Search } from 'lucide-react';

const Overview = () => {
  const dummyMembersData: Member[] = [
    {
      id: "1",
      name: "James Edward",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "Admin",
      lastLogin: "July 22, 2025",
      creditsUsed: 10,
    },
    {
      id: "2",
      name: "Michelle Walters",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Basketballer",
      lastLogin: "July 22, 2025",
      creditsUsed: 5,
    },
    {
      id: "3",
      name: "Malik Bronson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      role: "Basketballer",
      lastLogin: "July 22, 2025",
      creditsUsed: 10,
    },
    {
      id: "4",
      name: "DeShawn Rivers",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      role: "Manager",
      lastLogin: "July 20, 2025",
      creditsUsed: 20,
    },
    {
      id: "5",
      name: "Andre \"Buckets\" Wallace",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "Basketballer",
      lastLogin: "July 10, 2025",
      creditsUsed: 5,
    },
  ];

  const dummyGoalsData: Goal[] = [
    {
      id: "1",
      roomType: "Rookie Room",
      goal: 80,
      completionRate: 80,
      dueDate: "July 10, 2025",
    },
    {
      id: "2",
      roomType: "General Room",
      goal: 50,
      completionRate: 92,
      dueDate: "July 9, 2025",
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h3 className='pb-6 md:pl-6 pl-3 border-b border-[#ECEEF4] font-medium md:text-2xl text-xl'>Organizations view details</h3>
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <Search/>
        <div className="md:flex items-center gap-3 hidden">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-[#000000]">
            <img src={lakers} alt="lakers image" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-medium text-[#333333]">Acme Inc.</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-3 border border-[#252A39] rounded-md text-[#252A39] bg-transparent font-normal flex items-center gap-2">
            <img src={archive} alt="verticals icon" className="w-4" />
            <span className='md:flex hidden'>Accessible verticals</span>
          </button>
          <button className="px-4 py-3 border border-[#252A39] rounded-md text-[#252A39] bg-transparent font-normal flex items-center gap-2">
            <img src={coaching} alt="coaching icon" className="w-4" />
            <span className='md:flex hidden'>1 on 1 Coaching</span>
          </button>
          <button className="px-4 py-3 bg-[#64BA9F] text-white rounded-md flex items-center gap-2">
            <PlusIcon className='text-white flex md:hidden h-4.5'/>
            <span className='md:flex hidden'>Add member</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Members */}
        <div className="bg-white border border-gray-200 rounded-md p-[2px] shadow-[0_0_0_1px_#00000014,_inset_0_0_0_1px_#FFFFFF]">
          <div className="bg-white border border-gray-200 md:space-y-12 space-y-6 rounded-md p-4">
            <h3 className="text-sm font-medium text-[#474D63]">Total Members</h3>
            <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-[#18181B]">120</p>
          </div>
        </div>

        {/* Total Credits Left */}
        <div className="bg-white border border-gray-200 rounded-md p-[2px] shadow-[0_0_0_1px_#00000014,_inset_0_0_0_1px_#FFFFFF]">
          <div className="bg-white border border-gray-200 md:space-y-12 space-y-6 rounded-md p-4">
            <h3 className="text-sm font-medium text-[#474D63]">Total Credits Left</h3>
            <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-[#18181B]">85/1000</p>
          </div>
        </div>

        {/* 1 on 1 Coaching activated */}
        <div className="bg-white border border-gray-200 rounded-md p-[2px] shadow-[0_0_0_1px_#00000014,_inset_0_0_0_1px_#FFFFFF]">
          <div className="bg-white border border-gray-200 md:space-y-12 space-y-6 rounded-md p-4">
            <h3 className="text-sm font-medium text-[#474D63]">1 on 1 Coaching activated</h3>
            <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-[#18181B]">20</p>
          </div>
        </div>

        {/* Goals Completion */}
        <div className="bg-white border border-gray-200 rounded-md p-[2px] shadow-[0_0_0_1px_#00000014,_inset_0_0_0_1px_#FFFFFF]">
          <div className="bg-white border border-gray-200 md:space-y-12 space-y-6 rounded-md p-4">
            <h3 className="text-sm font-medium text-[#474D63]">Goals Completion</h3>
            <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-[#18181B]">79%</p>
          </div>
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center py-6 mt-4'>
          <h5 className='font-medium'>Members</h5>
          <button className='border border-[#E4E7EC] bg-transparent p-3 text-base rounded-sm text-[#252A39]'>View all</button>
        </div>
        <MembersTable
          data={dummyMembersData}
          pageSize={5}
          hidePagination={true}
          loadingMembers={false}
        />
      </div>
      <div>
        <div className='flex justify-between items-center py-6 mt-4'>
          <h5 className='font-medium'>Active Goals</h5>
          <button className='border border-[#E4E7EC] bg-transparent p-3 text-base rounded-sm text-[#252A39]'>View all</button>
        </div>
        <GoalsTable
          data={dummyGoalsData}
          pageSize={5}
          hidePagination={true}
          loadingGoals={false}
        />
      </div>

    </div>
  );
};

export { Overview };