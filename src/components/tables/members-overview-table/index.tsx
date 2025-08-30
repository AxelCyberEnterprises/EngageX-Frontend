import { useFetchEnterpriseUsers } from "@/hooks/organization/useFetchEnterpriseUsers";
import { BaseTable } from "../base-table";
import { columns } from "./columns";
import { Member } from "./data";
import { TableCell, TableRow } from "@/components/ui/table";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";

interface MembersTableProps {
    pageSize?: number;
    hidePagination?: boolean;
    orgId: number;
}

export const MembersOverviewTable = ({ pageSize = 5, hidePagination, orgId }: MembersTableProps) => {
    const { data, isLoading } = useFetchEnterpriseUsers(1, orgId);
    const members: Member[] =
        data?.results.map((user) => ({
            id: user.id.toString(),
            name: `${user.user.first_name} ${user.user.last_name}`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user.first_name + " " + user.user.last_name)}&background=cccccc&color=ffffff`,
            role: user.is_admin ? "Admin" : user.user_type || "N/A",
            lastLogin: new Date(user.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            creditsUsed: 0,
        })) ?? [];

    return (
        <BaseTable
            columns={columns}
            data={members}
            pageSize={pageSize}
            tableHeaderClassName="bg-[#F7F9FC]"
            tableHeaderItemClassName="text-gray-600 font-medium text-sm "
            tableContainerClassName="border-[#D0D5DD]"
            tableCellClassName="align-middle"
            tableRowClassName="[&>*]:!border-[#D0D5DD]"
            hidePagination={hidePagination}
            isLoading={isLoading}
            session={false}
            emptyState={
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="justify-center items-center w-full mx-auto py-[10%] flex-col gap-4 text-center"
                    >
                        <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
                        <p className="text-lg font-medium">No Members Found</p>
                        <p className="text-muted-foreground font-normal text-sm">Add a member goal to view them</p>
                    </TableCell>
                </TableRow>
            }
        />
    );
};
