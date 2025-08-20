import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type BookingLinkPayload = {
  link: string;
};

type CoachingSessionResponse = {
  id: number;
  status: string;
  scheduled_at: string;
};

export const useBookCoachingSession = (enterpriseId: number) => {
  return useMutation<CoachingSessionResponse, Error, BookingLinkPayload>({
    mutationFn: async (payload: BookingLinkPayload) => {
      const data = await apiPost<CoachingSessionResponse>(
        `/enterprise/${enterpriseId}/book-coaching-session/`,
        payload
      );
      return data;
    },
  });
};
