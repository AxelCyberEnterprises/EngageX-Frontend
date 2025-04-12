import React from 'react';
import { Skeleton } from '../ui/skeleton';

const AdminDashboardSkeleton: React.FC = () => {
    return (
               <div className="admin__dashboard__index py-3 px-4 bg-ghost-white">
                        {/* Header Skeleton */}
                        <div className="py-4 px-2 justify-between hidden md:flex">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-10 w-32" />
                        </div>
        
                        {/* Top Cards Skeleton */}
                        <div className="flex flex-wrap items-stretch">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div key={index} className="top__cards w-full md:w-1/2 lg:w-1/4 px-2 mb-3">
                                    <div className="dash__card p-4 flex flex-col h-full justify-between rounded-[12px] relative overflow-hidden">
                                        <div className="mb-4 flex items-center">
                                            <Skeleton className="h-5 w-5 rounded-full" />
                                            <Skeleton className="ms-2.5 h-4 w-24" />
                                        </div>
                                        <Skeleton className="h-8 w-16 mb-5.5" />
                                        <div className="flex items-center">
                                            <Skeleton className="h-4 w-16 me-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
        
                        {/* Charts Section Skeleton */}
                        <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
                            {/* First Chart */}
                            <div className="w-full lg:w-1/2 mt-3 mb-3">
                                <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                                    <div className="flex justify-between items-center mb-6">
                                        <Skeleton className="h-6 w-40" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                    <Skeleton className="flex-1 h-64" />
                                </div>
                            </div>
        
                            {/* Second Chart */}
                            <div className="w-full lg:w-1/2 mt-3 mb-3">
                                <div className="sessions__number dash__card h-full flex flex-col px-5 py-7 rounded-[8px]">
                                    <div className="flex justify-between items-center mb-6">
                                        <Skeleton className="h-6 w-40" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                    <Skeleton className="flex-1 h-64" />
                                </div>
                            </div>
                        </div>
        
                        {/* Bottom Section Skeleton */}
                        <div className="flex flex-wrap lg:items-stretch">
                            {/* Table Section */}
                            <div className="w-full lg:w-6/9 lg:pe-2 mb-4 mt-3 shad__table">
                                <div className="dash__card px-5 py-4 rounded-[8px]">
                                    <div className="flex justify-between items-center mb-4">
                                        <Skeleton className="h-6 w-40" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                    <Skeleton className="h-64 w-full" />
                                </div>
                            </div>
        
                            {/* Donut Chart Section */}
                            <div className="w-full lg:w-3/9 lg:ps-2 mb-4 mt-3 h-full">
                                <div className="dash__card w-full px-5 py-4 rounded-[8px]">
                                    <div className="flex items-center justify-between mb-4">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="w-full h-auto donut__chart">
                                        <Skeleton className="h-64 mb-3 rounded-full" />
                                        <div className="donut__details p-3">
                                            <div className="flex justify-between items-center mb-2.5">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-4 w-16" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
 

export default AdminDashboardSkeleton;