import { ColumnDef } from "@tanstack/react-table";
import { QuestionBankItem } from "./data";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { DragHandle } from "@/assets/images/svgs/drag-handle";


export const columns: ColumnDef<QuestionBankItem, any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        id: "drag",
        header: () => null,
        cell: () => <DragHandle />,
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: "question",
        header: () => null,
        cell: ({ row }) => {
            const question = row.original;
            return (
                <div className="text-[#101828] font-normal text-sm py-4 pr-4">
                    {question.question}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => null,
        cell: ({ row }) => {
            const handleEdit = (e: React.MouseEvent) => {
                e.stopPropagation();
                console.log('Edit question:', row.original.id);
            };

            const handleDelete = (e: React.MouseEvent) => {
                e.stopPropagation();
                console.log('Delete question:', row.original.id);
            };

            return (
                <div className="flex items-center gap-2 py-4">
                    <button
                        onClick={handleEdit}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit question"
                    >
                        <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete question"
                    >
                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                    </button>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
        size: 100,
    },
];