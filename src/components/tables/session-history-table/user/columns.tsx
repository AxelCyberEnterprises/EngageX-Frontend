import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ISession } from "@/types/sessions";
import { ColumnDef } from "@tanstack/react-table";
import { TrendingUp } from "lucide-react";
import BaseTableColumnHeader from "../../base-table/BaseTableColumnHeader";

export type IUserSessionHistory = {
    id: string | number;
    sessionName: string;
    sessionType: string;
    date: string;
    duration: string;
    // The full session, for the Improve flow
    raw: ISession;
};

interface UserSessionColumnOptions {
    selectedIds: string[];
    onToggle: (row: IUserSessionHistory, checked: boolean) => void;
    /** Two sessions are already ticked, so the remaining boxes switch off. */
    selectionFull: boolean;
    /** Improve is hidden for "rookie" sports users, as the old dashboard card was. */
    showImprove: boolean;
    onImprove: (row: IUserSessionHistory) => void;
}

// Row clicks open the report, so clicks on the checkbox and Improve button must not reach the row.
const stopRowClick = (e: React.SyntheticEvent) => e.stopPropagation();

export const getUserSessionColumns = ({
    selectedIds,
    onToggle,
    selectionFull,
    showImprove,
    onImprove,
}: UserSessionColumnOptions): ColumnDef<IUserSessionHistory>[] => [
    {
        id: "select",
        header: () => null,
        cell: ({ row }) => {
            const id = String(row.original.id);
            const checked = selectedIds.includes(id);
            return (
                <div onClick={stopRowClick}>
                    <Checkbox
                        checked={checked}
                        disabled={!checked && selectionFull}
                        onCheckedChange={(value) => onToggle(row.original, !!value)}
                        aria-label={`Select ${row.original.sessionName} to compare`}
                        className="p-0 bg-white border-[1.5px]"
                    />
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "sessionName",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Session Name" />,
    },
    {
        accessorKey: "sessionType",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Session Type" />,
    },
    {
        accessorKey: "date",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Date" />,
    },
    {
        accessorKey: "duration",
        header: ({ column }) => <BaseTableColumnHeader column={column} title="Duration" />,
    },
    ...(showImprove
        ? [
              {
                  id: "improve",
                  header: () => <span className="block text-right">Action</span>,
                  enableSorting: false,
                  enableHiding: false,
                  cell: ({ row }) => (
                      <div className="flex justify-end" onClick={stopRowClick}>
                          <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-1.5 border-branding-secondary text-branding-secondary bg-white hover:bg-branding-secondary hover:text-white shadow-none"
                              onClick={() => onImprove(row.original)}
                              aria-label={`Improve ${row.original.sessionName}`}
                          >
                              <TrendingUp className="size-4" />
                              Improve
                          </Button>
                      </div>
                  ),
              } as ColumnDef<IUserSessionHistory>,
          ]
        : []),
];
