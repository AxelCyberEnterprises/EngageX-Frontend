import CompareSessionsPanel from "@/components/dashboard/CompareSessionsPanel";
import ImproveSessionNameDialog from "@/components/dashboard/performance-improvement/ImproveSessionNameDialog";
import SessionConfirmationDialog from "@/components/dashboard/performance-improvement/SessionConfirmationDialog";
import SessionHistoryTable from "@/components/tables/session-history-table/user";
import { IUserSessionHistory } from "@/components/tables/session-history-table/user/columns";
import { Button } from "@/components/ui/button";
import { buildImproveSetup } from "@/lib/improve";
import { RootState } from "@/store";
import { handleDialog, updateNewPISData } from "@/store/slices/performance_improvement_slice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MAX_COMPARE = 2;

interface SelectedSession {
    id: string;
    name: string;
}

/**
 * Report History: the session list, comparison and Improve in one page.
 * Tick up to two sessions to compare them; each row also has an Improve button.
 */
const UserSessionHistory = () => {
    const dispatch = useDispatch();
    const confirmationOpen = useSelector((state: RootState) => state.performance_improvement.dialog.session_confirmation);

    // Kept at page level so ticks survive paging through the history.
    const [selected, setSelected] = useState<SelectedSession[]>([]);
    const [comparing, setComparing] = useState<[string, string] | null>(null);
    const comparisonRef = useRef<HTMLDivElement>(null);

    const selectedIds = selected.map((s) => s.id);

    const handleToggle = useCallback((row: IUserSessionHistory, checked: boolean) => {
        const id = String(row.id);
        setComparing(null);
        setSelected((prev) => {
            if (!checked) return prev.filter((s) => s.id !== id);
            if (prev.length >= MAX_COMPARE || prev.some((s) => s.id === id)) return prev;
            return [...prev, { id, name: row.sessionName }];
        });
    }, []);

    const handleImprove = useCallback(
        (row: IUserSessionHistory) => {
            // A session already in a series continues that series, so there is no new name to ask for.
            const existingSequenceId = row.raw.sequence ? String(row.raw.sequence) : null;

            dispatch(
                updateNewPISData({
                    title: row.sessionName,
                    impact: Number(row.raw.impact) || 0,
                    date: row.date,
                    duration: row.duration,
                    new_sequence_name: "",
                    session_type: row.raw.session_type,
                    virtual_enviroment: row.raw.virtual_environment,
                    session_id: Number(row.id),
                    existing_sequence_id: existingSequenceId,
                    setup: buildImproveSetup(row.raw),
                }),
            );
            dispatch(
                handleDialog({
                    dialog: { new_pis_isopen: !existingSequenceId, session_confirmation: !!existingSequenceId },
                }),
            );
        },
        [dispatch],
    );

    const handleCompare = () => {
        if (selected.length === MAX_COMPARE) setComparing([selected[0].id, selected[1].id]);
    };

    useEffect(() => {
        if (comparing) comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [comparing]);

    return (
        <section className="px-4 py-3 flex flex-col gap-y-6">
            <div>
                <h6>Report History</h6>
                <p className="text-sm text-[#6F7C8E] mt-1">Check the box beside a session to compare two sessions.</p>
            </div>

            {comparing && (
                <div ref={comparisonRef}>
                    <CompareSessionsPanel id1={comparing[0]} id2={comparing[1]} onClose={() => setComparing(null)} />
                </div>
            )}

            <SessionHistoryTable
                selectedIds={selectedIds}
                onToggle={handleToggle}
                onImprove={handleImprove}
            />

            {selected.length === MAX_COMPARE && (
                <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#10161E] px-5 py-3 text-white shadow-lg">
                    <div>
                        <p className="font-medium">2 sessions selected: Compare</p>
                        <p className="text-xs text-white/70">
                            {selected[0].name} and {selected[1].name}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="bg-transparent p-0 underline text-white"
                            onClick={() => {
                                setSelected([]);
                                setComparing(null);
                            }}
                        >
                            Clear
                        </button>
                        <Button
                            type="button"
                            className="bg-branding-secondary hover:bg-branding-secondary/90 text-white shadow-none"
                            onClick={handleCompare}
                        >
                            Compare
                        </Button>
                    </div>
                </div>
            )}

            <ImproveSessionNameDialog />
            {confirmationOpen && <SessionConfirmationDialog />}
        </section>
    );
};

export default UserSessionHistory;
