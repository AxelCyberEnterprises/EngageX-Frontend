import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDataTable } from "@/hooks/use-data-table";
import { LoaderCircle, X } from "lucide-react";
import { DataTable } from "../data-table";
import { IMembers, membersColumns } from "./columns";
import { useFetchEnterpriseUsers } from "@/hooks/organization/useFetchEnterpriseUsers";
import { useLocation } from "react-router-dom";
import { useMemo, useEffect } from "react";

const MembersTable = () => {
    const routerLocation = useLocation();
    const searchParams = new URLSearchParams(routerLocation.search);
    const orgIdParam = searchParams.get("id");
    const orgId = orgIdParam ? Number(orgIdParam) : undefined;
    const { data, isLoading } = useFetchEnterpriseUsers(1, orgId);

    useEffect(() => {
        if (orgId) {
            // Log the raw API response for debugging
            console.log("[MembersTable] Enterprise users response:", { orgId, data });
        }
    }, [orgId, data]);
    const members: IMembers[] = useMemo(() => {
        return (
            data?.results.map((user) => ({
                id: user.id.toString(),
                name: `${user.user.first_name} ${user.user.last_name}`,
                role: user.is_admin ? "Admin" : user.user_type === "general" ? "Basketballer" : "Rookie",
                last_login: new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }),
                credit_used: 0,
                assigned_goals: [user.user_type]
            })) ?? []
        );
    }, [data?.results]);

    const { table } = useDataTable({
        data: members || [],
        columns: membersColumns,
        // pageCount: 10,
        // getRowId: (originalRow) => originalRow.id,
        // shallow: false,
        // clearOnDefault: true,
    });
    const selectedCount = table.getFilteredSelectedRowModel().rows.length;

    if (!orgId) {
        return <div className="text-sm text-muted-foreground">No organization selected.</div>;
    }

    if (isLoading) return <LoaderCircle className="animate-spin" />;
    return (
        <>
            <DataTable table={table} className="gap-4">
                {selectedCount > 0 && (
                    <div className="flex items-center justify-between rounded-xl border border-bright-gray px-4 py-3 shadow-[0_2px_12px_0_#0000001A]">
                        <div className="flex items-center gap-12">
                            <div className="flex items-center gap-4">
                                <span>{selectedCount} selected</span>
                                <Separator
                                    orientation="vertical"
                                    className="data-[orientation=vertical]:h-6 bg-[#98A2B3]"
                                />
                                <Button
                                    variant="outline"
                                    className="text-primary"
                                    onClick={() => table.toggleAllRowsSelected(true)}
                                >
                                    Select all
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    className="text-primary"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.33398 17.5003H16.6673M4.72232 10.9894C4.367 11.3456 4.16741 11.8281 4.16732 12.3311V15.0003H6.85315C7.35648 15.0003 7.83898 14.8003 8.19482 14.4436L16.1115 6.52278C16.4667 6.16661 16.6661 5.68413 16.6661 5.18111C16.6661 4.6781 16.4667 4.19562 16.1115 3.83945L15.3298 3.05611C15.1535 2.87974 14.9442 2.73984 14.7138 2.64442C14.4834 2.549 14.2365 2.49992 13.9871 2.5C13.7378 2.50008 13.4909 2.54931 13.2605 2.64487C13.0302 2.74044 12.821 2.88046 12.6448 3.05695L4.72232 10.9894Z"
                                            stroke="#252A39"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Edit
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    className="text-primary"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.1625 11.3418L3.74625 12.4918C3.34625 12.8855 3.125 13.3143 3.125 13.7493C3.125 15.3568 6.15875 16.8743 10 16.8743C13.8412 16.8743 16.875 15.3568 16.875 13.7493C16.875 13.3143 16.6525 12.8868 16.2537 12.493L16.8488 11.3518C17.655 12.0268 18.125 12.8443 18.125 13.7493C18.125 16.283 14.4425 18.1243 10 18.1243C5.5575 18.1243 1.875 16.283 1.875 13.7493C1.875 12.8393 2.35 12.0193 3.1625 11.3418Z"
                                            fill="#252A39"
                                        />
                                        <path
                                            d="M3.1625 7.5918L3.74625 8.7418C3.34625 9.1368 3.125 9.56555 3.125 9.9993C3.125 11.6068 6.15875 13.1243 10 13.1243C13.8412 13.1243 16.875 11.6068 16.875 9.9993C16.875 9.5643 16.6525 9.1368 16.2537 8.74305L16.8488 7.6018C17.655 8.2768 18.125 9.0943 18.125 9.9993C18.125 12.533 14.4425 14.3743 10 14.3743C5.5575 14.3743 1.875 12.533 1.875 9.9993C1.875 9.0893 2.35 8.2693 3.1625 7.5918Z"
                                            fill="#252A39"
                                        />
                                        <path
                                            d="M10 10.625C5.5575 10.625 1.875 8.78375 1.875 6.25C1.875 3.71625 5.5575 1.875 10 1.875C14.4425 1.875 18.125 3.71625 18.125 6.25C18.125 8.78375 14.4425 10.625 10 10.625ZM10 9.375C13.8412 9.375 16.875 7.8575 16.875 6.25C16.875 4.6425 13.8412 3.125 10 3.125C6.15875 3.125 3.125 4.6425 3.125 6.25C3.125 7.8575 6.15875 9.375 10 9.375Z"
                                            fill="#252A39"
                                        />
                                    </svg>
                                    Assign Credits
                                </Button> */}
                                <Button
                                    variant="outline"
                                    className="text-crimson-red hover:text-crimson-red"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.90518 5.17669L5.66602 15.8125C5.74656 16.2994 5.99734 16.7419 6.37368 17.0612C6.75003 17.3805 7.22749 17.5558 7.72102 17.5559H10.511M16.0927 5.17669L14.3327 15.8125C14.2521 16.2994 14.0014 16.7419 13.625 17.0612C13.2487 17.3805 12.7712 17.5558 12.2777 17.5559H9.48768M8.35102 9.26253V13.47M11.6477 9.26253V13.47M2.29102 5.17669H17.7077M12.3135 5.17669V3.69336C12.3135 3.36184 12.1818 3.0439 11.9474 2.80948C11.713 2.57506 11.395 2.44336 11.0635 2.44336H8.93518C8.60366 2.44336 8.28572 2.57506 8.0513 2.80948C7.81688 3.0439 7.68518 3.36184 7.68518 3.69336V5.17669H12.3135Z"
                                            stroke="#940803"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Remove
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="bg-transparent text-primary"
                            onClick={() => table.toggleAllRowsSelected(false)}
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                )}
            </DataTable>
        </>
    );
};

export default MembersTable;
