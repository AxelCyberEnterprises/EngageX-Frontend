import { useMutation } from "@tanstack/react-query";
import { apiPostFileFetch } from "@/lib/api"; // Use fetch version

type EnterpriseBulkUserPayload = {
    enterprise_id: number; 
    file: File | null;
    send_invitation: boolean; 
};

export function useCreateEnterpriseUserBulk() {
  return useMutation<any, Error, EnterpriseBulkUserPayload>({
    mutationFn: async (payload: EnterpriseBulkUserPayload) => {
      if (!payload.file) {
        throw new Error("No file provided");
      }

      const formData = new FormData();
      formData.append("enterprise_id", String(payload.enterprise_id));
      formData.append("send_invitation", String(payload.send_invitation));
      formData.append("file", payload.file);

      console.log("🚀 Preparing upload:");
      console.log("Enterprise ID:", payload.enterprise_id);
      console.log("Send invitation:", payload.send_invitation);
      console.log("File:", payload.file.name, payload.file.type, payload.file.size);

      const response = await apiPostFileFetch<any>(
        `/enterprise/enterprise-users/bulk-upload/`,
        formData,
        "default"
      );
      return response;
    },
  });
}