import { apiPost } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

interface EmailProgressReportPayload {
  name: string;
  domain: string[];
  enterprise_type?: 'sport' | 'general';
  is_active?: boolean;
  require_domain_match?: boolean;
  one_on_one_coaching_link?: string | null;
  accessible_verticals?: Record<string, any>;
}

interface EnterpriseResponse {
  id: number;
  name: string;
  domain: string[];
  enterprise_type?: 'sport' | 'general';
  logo?: string | null;
  is_active: boolean;
  require_domain_match: boolean;
  one_on_one_coaching_link?: string | null;
  accessible_verticals?: Record<string, any>;
  available_verticals?: string;
  created_at: string;
  updated_at: string;
}

export const useEmailProgressReport = (enterpriseId: number) => {
  return useMutation<EnterpriseResponse, Error, EmailProgressReportPayload>({
    mutationFn: async (data: EmailProgressReportPayload) => {
      const response = await apiPost<EnterpriseResponse>(
        `/enterprise/enterprises/${enterpriseId}/progress-report/email/`,
        data
      );
      return response;
    },
  });
};
