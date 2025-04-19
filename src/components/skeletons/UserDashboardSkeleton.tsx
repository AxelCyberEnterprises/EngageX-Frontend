import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardSkeleton() {
  return (
    <div className="user__dashboard__index p-4 md:px-8">
      <Skeleton className="h-6 w-1/2 mb-5" />

      {/* Cards section */}
      <div className="flex flex-wrap -mx-2 items-stretch">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full lg:w-1/4 px-2 mb-3">
            <div className="index__card p-4 h-[180px] rounded-[12px] relative overflow-hidden flex flex-col justify-between">
              <Skeleton className="h-3 w-1/2 mb-3" />
              <Skeleton className="h-6 w-2/3 mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Main content below cards */}
      <div className="flex flex-wrap">
        {/* Left column */}
        <div className="w-full lg:w-6/9 lg:pe-2 mb-3">
          <div className="session__score w-full p-5 rounded-[12px] mb-4">
            <Skeleton className="h-6 w-1/3 mb-5" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-3 w-3/4 mb-6" />
            <Skeleton className="h-2.5 w-full rounded-full" />
            <Skeleton className="h-4 w-1/2 mt-6" />
          </div>

          <div className="border-gray mt-4 p-5 border rounded-lg relative bg-no-repeat bg-right-bottom mb-4">
            <Skeleton className="h-5 w-1/3 mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-10 w-1/2" />
          </div>

          <div className="analytics px-5 py-7 mt-6 mb-4 rounded-[8px]">
            <Skeleton className="h-6 w-1/3 mb-6" />
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-3 w-full mt-6" />
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-3/9 lg:ps-2 mb-3 lg:mb-10">
          <div className="goals p-5 rounded-[12px]">
            <Skeleton className="h-6 w-1/3 mb-3" />
            <Skeleton className="h-4 w-20 mb-7" />

            {/* Circular goal chart placeholder */}
            <div className="progress__div relative flex flex-col items-center w-full mt-7 mb-6">
              <Skeleton className="rounded-full h-32 w-32 mb-4" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-4 w-3/5" />
            </div>

            {/* Progress Bars */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex mb-3 items-center">
                <Skeleton className="rounded-full h-12 w-12 mr-3" />
                <div className="w-full">
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              </div>
            ))}

            <Skeleton className="h-10 w-full mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
