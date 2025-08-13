import { useDataTable } from "@/hooks/use-data-table";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { IMembers, membersColumns } from "./columns";
import { LoaderCircle } from "lucide-react";

const MembersTable = () => {
    const [membersData, setMembersData] = useState<IMembers[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        import("./data.json").then((mod) => {
            if (isMounted) {
                setMembersData(
                    mod.default.map((item) => ({
                        ...item,
                    })),
                );
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const { table } = useDataTable({
        data: membersData || [],
        columns: membersColumns,
        // pageCount: 10,
        // getRowId: (originalRow) => originalRow.id,
        // shallow: false,
        // clearOnDefault: true,
    });

    if (loading) return <LoaderCircle className="m-4 animate-spin" />;
    return (
        <>
            <DataTable table={table}></DataTable>
        </>
    );
};

export default MembersTable;
