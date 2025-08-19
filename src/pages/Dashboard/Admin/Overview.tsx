import { useState } from 'react';
import coaching from '../../../assets/images/svgs/coaching.svg';
import archive from '../../../assets/images/svgs/archive.svg';
import { MembersOverviewTable } from '@/components/tables/members-overview-table';
import { GoalsTable } from '@/components/tables/active-goals-table';
import { PlusIcon, Search } from 'lucide-react';
import AccessibleVerticalsModal from '@/components/modals/modalVariants/AccessibleVerticalsModal';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { openDialog } from "@/store/slices/dynamicDialogSlice";
import { useDispatch } from "react-redux";
import AddMembers from "@/components/dialogs/dialog-contents/AddMembers";
import IssueCreditsModal from '@/components/modals/modalVariants/IssueCreditModal';
import { useFetchSingleOrganization } from '@/hooks/organization/useFetchSingleOrganization';
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchOrganizationStats } from '@/hooks/organization/useFetchOrganizationStats';
import AddBookingLinkModal from '@/components/modals/modalVariants/BookingLinkModal';

const Overview = () => {
  const dispatch = useDispatch();
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showVerticalsModal, setShowVerticalsModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orgId = Number(searchParams.get("id"));
  const { data: organization, isLoading } = useFetchSingleOrganization(orgId);
  const { data: stats, isLoading: loadingStats } = useFetchOrganizationStats(orgId);
  const orgLogo =
    organization?.logo ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(organization?.name ?? "No Name")}&background=cccccc&color=ffffff`;


  const statsMock = stats
    ? [
      { label: "Total Members", value: stats.total_members },
      { label: "Total Credits Left", value: stats.credits_left },
      { label: "1 on 1 Coaching activated", value: stats.one_on_one_coaching_activated ? 'Available' : 'Unavailable' },
      { label: "Goals Completion", value: `${stats.goals_completion_percent}%` },
    ]
    : [];


  return (
    <div className="px-6 pb-8 bg-white min-h-screen">
      <h3 className='py-4 md:pl-6 pl-3 border-b border-[#ECEEF4] font-medium md:text-3xl text-xl'>Organizations view details</h3>

      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <div className="md:flex items-center gap-3 hidden">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-[#000000]">
            {isLoading ? <Skeleton className="w-full h-full" /> : <img src={orgLogo} alt="organization logo" className="w-full h-full object-cover" />}
          </div>
          {isLoading ? <Skeleton className="w-48 h-6" /> : <h1 className="text-2xl font-medium text-[#333333]">{organization?.name}</h1>}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex md:hidden relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Users"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none w-64"
            />
          </div>
          <Button className="px-4 py-3 border border-[#252A39] rounded-md text-[#252A39] bg-transparent hover:bg-transparent hover:scale-105 transition-all duration-200 font-normal flex items-center gap-2" onClick={() => setShowCreditModal(true)}>
            <PlusIcon className='h-4' />
            <span className='md:flex hidden'>Add Organization credits</span>
          </Button>
          <Button className="px-4 py-3 border border-[#252A39] rounded-md text-[#252A39] bg-transparent hover:bg-transparent hover:scale-105 transition-all duration-200 font-normal flex items-center gap-2" onClick={() => setShowVerticalsModal(true)}>
            <img src={archive} alt="verticals icon" className="w-4" />
            <span className='md:flex hidden'>Accessible verticals</span>
          </Button>
          <Button onClick={() => setShowBookingModal(true)} className="px-4 py-3 border border-[#252A39] rounded-md text-[#252A39] bg-transparent hover:bg-transparent hover:scale-105 transition-all duration-200 font-normal flex items-center gap-2">
            <img src={coaching} alt="coaching icon" className="w-4" />
            <span className='md:flex hidden'>1 on 1 Coaching</span>
          </Button>
          <Button
            className="bg-[#64BA9F] hover:bg-[#64BA9F]/90"
            onClick={() =>
              dispatch(
                openDialog({
                  key: "add-members",
                  children: <AddMembers />,
                }),
              )
            }
          >
            <PlusIcon className='text-white flex md:hidden h-4.5' />
            Add member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {statsMock.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-md p-[2px] shadow-[0_0_0_1px_#00000014,_inset_0_0_0_1px_#FFFFFF]"
          >
            <div className="bg-white border border-gray-200 md:space-y-12 space-y-6 rounded-md p-4 h-full">
              <h3 className="text-sm font-medium text-[#474D63]">{stat.label}</h3>
              {loadingStats ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                <p className="lg:text-4xl md:text-3xl text-2xl font-medium text-[#18181B]">{stat.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Members Table */}
      <div>
        <div className='flex justify-between items-center py-6 mt-4'>
          <h6 className='font-medium'>Members</h6>
          <Link to="/dashboard/admin/organization/members" className='border border-[#E4E7EC] bg-transparent lg:py-3 py-1 px-4 text-lg rounded-md text-[#252A39] font-[300]'>View all</Link>
        </div>
        {isLoading ? <Skeleton className="w-full h-48" /> : <MembersOverviewTable orgId={orgId} pageSize={5} hidePagination={true} />}
      </div>

      {/* Goals Table */}
      <div>
        <div className='flex justify-between items-center py-6 mt-7'>
          <h6 className='font-medium'>Active Goals</h6>
        </div>
        {isLoading ? <Skeleton className="w-full h-48" /> : <GoalsTable orgId={orgId} pageSize={5} hidePagination={true} />}
      </div>

      <AccessibleVerticalsModal
        show={showVerticalsModal}
        onClose={() => setShowVerticalsModal(false)}
        verticals={organization?.available_verticals}
        orgId={orgId}
      />

      <IssueCreditsModal
        show={showCreditModal}
        onClose={() => setShowCreditModal(false)}
        orgId={orgId}
      />
      <AddBookingLinkModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
};

export { Overview };
