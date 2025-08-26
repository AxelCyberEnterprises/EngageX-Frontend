import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "@/lib/api";

export function useDeleteEnterpriseUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await apiDelete(`/enterprise/enterprise-users/${id}/`, "default");
            return response;
        },
        onSuccess: () => {
            // Invalidate enterprise users queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ["enterprise-users"] });
        },
    });
}

export function useDeleteMultipleEnterpriseUsers() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (ids: number[]) => {
            // Execute all delete requests in parallel
            const deletePromises = ids.map(id =>
                apiDelete(`/enterprise/enterprise-users/${id}/`, "default")
            );

            const results = await Promise.allSettled(deletePromises);

            // Check if any deletions failed
            const failures = results.filter(result => result.status === 'rejected');
            if (failures.length > 0) {
                throw new Error(`Failed to delete ${failures.length} out of ${ids.length} users`);
            }

            return results;
        },
        onSuccess: () => {
            // Invalidate enterprise users queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ["enterprise-users"] });
        },
    });
}
