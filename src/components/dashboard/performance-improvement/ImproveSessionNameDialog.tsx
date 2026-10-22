import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RootState } from "@/store";
import { handleDialog, updateNewPISData } from "@/store/slices/performance_improvement_slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * First step of "Improve" on the Report History page: the user names the new practice.
 * The chosen session is already in the performance_improvement slice (set by the Improve button).
 * Continue opens SessionConfirmationDialog, whose Back button reopens this dialog.
 */
function ImproveSessionNameDialog() {
    const dispatch = useDispatch();
    const { dialog, new_pis } = useSelector((state: RootState) => state.performance_improvement);
    const [name, setName] = useState("");

    useEffect(() => {
        if (dialog.new_pis_isopen) setName(new_pis.new_sequence_name);
    }, [dialog.new_pis_isopen, new_pis.new_sequence_name]);

    const close = () => dispatch(handleDialog({ dialog: { new_pis_isopen: false, session_confirmation: false } }));

    const handleContinue = () => {
        if (!name.trim() || new_pis.session_id === null) return;
        dispatch(
            updateNewPISData({
                ...new_pis,
                session_id: new_pis.session_id,
                new_sequence_name: name.trim(),
            }),
        );
        dispatch(handleDialog({ dialog: { new_pis_isopen: false, session_confirmation: true } }));
    };

    return (
        <AlertDialog open={dialog.new_pis_isopen} onOpenChange={(open) => !open && close()}>
            <AlertDialogContent className="p-0 overflow-clip border-0 font-montreal">
                <AlertDialogHeader>
                    <AlertDialogTitle className="p-4 bg-alice-blue font-medium text-left">
                        Improve this session
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="px-6 pb-6 space-y-4 text-left">
                            <div className="rounded-xl border border-gray p-4">
                                <p className="text-black">{new_pis.title}</p>
                                <div className="flex divide-x gap-2">
                                    <small className="small pr-2">{new_pis.date}</small>
                                    <small className="small">{new_pis.duration}</small>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <small className="text-[#A06821]">Name your new practice</small>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                                    className="text-black"
                                    placeholder="Type here"
                                    autoFocus
                                />
                            </div>
                            <div className="flex items-center justify-end gap-4 pt-2">
                                <button
                                    className="rounded-2xl bg-transparent px-10 py-2 h-12 text-gunmetal border border-gray"
                                    onClick={close}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded-2xl px-10 py-2 h-12 disabled:opacity-40"
                                    disabled={!name.trim()}
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ImproveSessionNameDialog;
