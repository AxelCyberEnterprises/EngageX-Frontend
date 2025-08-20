import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

export type AssignedGoal = {
  goal_id: number;
  room: string;
  name: string;
  target: number;
  completed: number;
  progress: number;
  due_date: string | null;
  is_active: boolean;
};

export type ReportUser = {
  user_id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role: string | null;
  assigned_goals: AssignedGoal[];
  sessions_completed: number;
  overall_goal_completion: number;
  last_session_date: string | null;
};

export type GoalsSummary = {
  goal_id: number;
  name: string;
  target: number;
  average_completed: number;
  progress: number;
};

export type EnterpriseReportResponse = {
  enterprise_id: number;
  enterprise_name: string;
  total_users: number;
  total_sessions: number;
  average_goal_completion: number;
  goals_summary: GoalsSummary[];
  users: ReportUser[];
};

// -----------------------------
// Hook
// -----------------------------
export function useFetchEnterpriseReport(
  enterprise_id: number,
  enterprise_user_ids?: number[]
) {
  const userIdsParam =
    enterprise_user_ids && enterprise_user_ids.length > 0
      ? `&enterprise_user_ids=${enterprise_user_ids.join(",")}`
      : "";

  return useQuery<EnterpriseReportResponse>({
    queryKey: [
      "enterprise-report",
      enterprise_id,
      enterprise_user_ids?.sort().join(",") || "all",
    ],
    queryFn: async () => {
      return apiGet<EnterpriseReportResponse>(
        `/enterprise/enterprise-users/progress-data/?enterprise_id=${enterprise_id}${userIdsParam}`,
        "default"
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
