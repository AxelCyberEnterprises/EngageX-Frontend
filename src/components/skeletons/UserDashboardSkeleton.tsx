import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardSkeleton() {
    return (
        <div className="user__dashboard__index p-4 md:px-8">
            <Skeleton className="h-6 w-1/2 mb-5" />

            {/* Cards section */}
            <div className="flex flex-wrap -mx-2 items-stretch">
                {/* Enterprise user card or credits card */}
                <div className="w-full lg:w-1/4 px-2 mb-3">
                    <div className="index__card p-4 h-[180px] rounded-[12px] relative overflow-hidden flex flex-col justify-between">
                        <Skeleton className="h-3 w-1/2 mb-3" />
                        <Skeleton className="h-6 w-2/3 mb-4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                {/* Regular cards */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-full lg:w-1/4 px-2 mb-3">
                        <div className="index__card p-4 h-[180px] rounded-[12px] relative overflow-hidden flex flex-col justify-between">
                            <Skeleton className="h-3 w-1/2 mb-3" />
                            <Skeleton className="h-6 w-2/3 mb-4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile cards section */}
            <div className="flex items-stretch my-6 md:hidden">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1/3 p-2 flex flex-col items-center">
                        <Skeleton className="w-15 h-15 aspect-square rounded-4xl mb-3" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>

            {/* Session score section */}
            <div className="session__score w-full p-5 rounded-[12px] mb-4">
                <Skeleton className="h-6 w-1/3 mb-5" />
                <div className="mb-2 flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full mb-6" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Improve past session section */}
            <div className="border-gray mt-4 p-5 border rounded-lg relative bg-no-repeat bg-right-bottom mb-4">
                <Skeleton className="h-5 w-1/3 mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-10 w-1/2" />
            </div>
        </div>
    );
}
