import { Skeleton } from "@/components/ui/skeleton";

const RookieRoomFormSkeleton = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-10 gap-6 animate-pulse">
      {/* Left Section */}
      <section className="flex-1 space-y-10">
        {/* Session Name */}
        <Skeleton className="h-12 w-1/2 rounded-lg" />

        {/* Sports Industry */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3 rounded" />
          <Skeleton className="h-11 w-1/2 rounded-lg" />
        </div>

        {/* Goals Section */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/4 rounded" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>

        {/* Time Allocation */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/4 rounded" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>

        {/* Speaker Notes */}
        <div className="space-y-3">
          <Skeleton className="h-5 w-1/3 rounded" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </section>

      {/* Right Section */}
      <section className="lg:space-y-6 space-y-12 lg:max-w-100">
        {/* Training Type */}
        <div className="border border-bright-gray p-4 rounded-2xl space-y-4">
          <Skeleton className="h-5 w-1/3 rounded" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* Virtual Environment */}
        <div className="border border-bright-gray p-4 rounded-2xl space-y-4">
          <Skeleton className="h-5 w-1/3 rounded" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-28 w-full rounded-lg" />
          </div>
        </div>

        {/* Quick Tips */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3 rounded" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default RookieRoomFormSkeleton;
