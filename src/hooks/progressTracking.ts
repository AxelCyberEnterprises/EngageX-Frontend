import { apiGet } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type TimeFrame = 'weekly' | 'monthly' | 'yearly';

export type SortOption = 
  | 'max-date' 
  | 'min-date' 
  | 'max-impact' 
  | 'min-impact' 
  | 'max-duration' 
  | 'min-duration';

interface ProgressTrackingParams {
  timeFrame?: TimeFrame;
  sort?: SortOption;
}

/**
 * Calculate date range based on the selected time frame
 */
const getDateRange = (timeFrame?: TimeFrame) => {
  const endDate = new Date();
  const startDate = new Date();

  if (timeFrame === 'weekly') {
    startDate.setDate(endDate.getDate() - 7);
  } else if (timeFrame === 'monthly') {
    startDate.setDate(endDate.getDate() - 30);
  } else if (timeFrame === 'yearly') {
    startDate.setDate(endDate.getDate() - 365);
  } else {
    startDate.setDate(endDate.getDate() - 30);
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

/**
 * Hook for fetching progress tracking data with sorting and date range filtering
 */
export function useProgressTracking(params: ProgressTrackingParams = {}) {
  const { timeFrame, sort = 'max-date' } = params;
  const { startDate, endDate } = getDateRange(timeFrame);

  return useQuery<any>({
    queryKey: ["performance-analytics", sort, startDate, endDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append('sort', sort);
      queryParams.append('start_date', startDate);
      queryParams.append('end_date', endDate);
      const url = `/sessions/performance-analytics/?${queryParams.toString()}`;
      const response = await apiGet<any>(url, "secondary");
      return response;
    },
  });
}

export function useGetSequence() {
  return useQuery<any>({
    queryKey: ["get-sequence"],
    queryFn: async () => {
      const response = await apiGet<any>(`/sessions/sequences/`, "secondary");
      return response;
    },
  });
}

export function useCompareSequences(id?: string) {
  const isValidId = typeof id === "string" && id.trim() !== "";

  return useQuery<any>({
    queryKey: ["get-sequence", id],
    queryFn: async () => {
      if (!isValidId) return null;
      const response = await apiGet<any>(`/sessions/compare-sequences/${id}`, "secondary");
      return response;
    },
    enabled: isValidId,
  });
}
