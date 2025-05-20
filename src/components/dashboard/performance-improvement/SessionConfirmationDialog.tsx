import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { handleDialog } from "@/store/slices/performance_improvement_slice";
import { useNavigate } from "react-router-dom";
import { useNewImprovmentSequence } from "@/hooks/auth";

function SessionConfirmationDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dialog = useSelector(
    (state: RootState) => state.performance_improvement.dialog
  );
  const pis_data = useSelector(
    (state: RootState) => state.performance_improvement.new_pis
  );
  const { mutate: addNewImprovmentSequence } = useNewImprovmentSequence();
  return (
    <AlertDialog
      open={dialog.session_confirmation}
      onOpenChange={() =>
        dispatch(
          handleDialog({
            dialog: {
              new_pis_isopen: false,
              session_confirmation: false,
            },
          })
        )
      }
    >
      <AlertDialogContent className="p-0 overflow-clip border-0">
        <AlertDialogHeader>
          <div className="flex justify-between p-4 bg-alice-blue items-center">
            <h6>Session Confirmation</h6>
            <div>
              <small className="flex items-center">
                Credit Remaining:{" "}
                <span className="ml-1">
                  <p className="big">10</p>
                </span>
              </small>
              <p className="xs text-[#A06821]">
                You are about to use 1 credits
              </p>
            </div>
          </div>
          <AlertDialogDescription className="px-6">
            <div className="pb-5 text-left">
              <p className="text-black big text-left">
                You are about to begin your session
              </p>
              <small className="text-left">
                Review your session details carefully before starting
              </small>
            </div>
            <div className="space-y-6 divide-y divide-gray text-left">
              <div className="flex gap-x-4 items-center">
                <div className="space-y-4 pb-2">
                  <small>Session Type</small>
                  <p className="text-black">{pis_data.session_type}</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <div className="space-y-4 pb-2">
                  <small>Virtual Environment</small>
                  <p className="text-black">{pis_data.virtual_enviroment}</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <div className="space-y-4 pb-2">
                  <small>AI Questions</small>
                  <p className="text-black">Enabled</p>
                </div>
              </div>

              {/* <div className="pb-2">
                <small>Phases</small>
                <div className="flex gap-4 mt-4">
                  <p className="xs p-1 px-5 rounded-full bg-gray">
                    Intoduction
                  </p>
                  <p className="xs p-1 px-5 rounded-full bg-gray">Body</p>
                  <p className="xs p-1 px-5 rounded-full bg-gray">Conclusion</p>
                </div>
              </div> */}

              <small className="p-4 w-full flex bg-alice-blue rounded-lg">
                Estimated Session Duration: <p className="ml-2">25 minutes</p>
              </small>
            </div>

            <div className="flex items-center justify-end py-8 gap-4">
              <button
                className="rounded-2xl bg-transparent px-10 py-2 h-12 text-gunmetal border border-gray"
                onClick={() => {
                  dispatch(
                    handleDialog({
                      dialog: {
                        new_pis_isopen: true,
                        session_confirmation: false,
                      },
                    })
                  );
                }}
              >
                Back
              </button>
              <button
                onClick={async () => {
                  addNewImprovmentSequence({
                    sequence_name: pis_data.new_sequence_name,
                    description: "",
                    session_id: String(pis_data.session_id),
                  });
                  navigate(
                    `/dashboard/user/${
                      pis_data.session_type == "public"
                        ? "public-speaking"
                        : pis_data.session_type == "pitch"
                        ? "pitch-practice"
                        : "presentation-practice"
                    }`
                  );
                }}
                className="rounded-2xl px-10 py-2 h-12"
              >
                Begin Session
              </button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SessionConfirmationDialog;
