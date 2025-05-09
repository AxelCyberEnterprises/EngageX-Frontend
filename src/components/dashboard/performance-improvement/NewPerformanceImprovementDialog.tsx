import { useEffect, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SessionConfirmationDialog from "./SessionConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  PIScreens,
  handleActiveScreen,
  handleDialog,
  handleSelectedScreen,
  updateNewPISData,
} from "@/store/slices/performance_improvement_slice";
import clsx from "clsx";
import { useSessionHistory } from "@/hooks/auth";
import {
  capitalizeWords,
  formatDate,
  formatTime,
} from "@/components/tables/session-history-table/admin";
import { toast } from "sonner";

interface Sessions {
  session_name: string;
  impact: number;
  date: string;
  duration: string;
  new_sequence_name: string;
  is_active: boolean;
}

function NewPerformanceImprovementDialog() {
  const [sessions, setSessions] = useState<Sessions[]>([]);
  const [newSequenceName, setNewSequenceName] = useState("");
  const dispatch = useDispatch();
  const { dialog, selected_screen } = useSelector(
    (state: RootState) => state.performance_improvement
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, error, isLoading } = useSessionHistory(
    pagination.pageIndex + 1
  );

  if (isLoading) {
    console.log("loading data...");
  }

  if (error) {
    toast.error("Can't load data at this time.");
  }

  console.log("sessions: ", sessions);

  const userSessionHistoryData: Sessions[] = useMemo(
    () =>
      data?.results?.map((item) => ({
        session_name: capitalizeWords(item.session_name || "Unknown Session"),
        impact: Number(item.impact) ?? 0,
        date: formatDate(item.date),
        duration: formatTime(item.duration?.toString()),
        new_sequence_name: "",
        is_active: false,
      })) ?? [],
    [data?.results]
  );

  useEffect(() => {
    if (!data?.results) return;
    setSessions(userSessionHistoryData);
  }, [data?.results, userSessionHistoryData]);

  const changeActive = (idx: number) => {
    setSessions((prev) =>
      prev.map((item, i) => ({
        ...item,
        is_active: idx === i,
      }))
    );
  };

  return (
    <div className="w-full h-full font-montreal border-0">
      {/* First Dialog */}
      <AlertDialog open={dialog.new_pis_isopen}>
        <AlertDialogTrigger className="bg-transparent p-0 m-0 text-black text-left w-full">
          <div
            onClick={() => dispatch(handleSelectedScreen(PIScreens.NEW_PIS))}
            className={clsx(
              "flex items-center space-x-4 text-left p-4 justify-between py-6 h-full w-full border rounded-2xl border-dark-gray overflow-clip",
              selected_screen === PIScreens.NEW_PIS &&
                "bg-alice-blue cursor-pointer"
            )}
          >
            <div className="flex text-left flex-col">
              <small className="small">
                New Performance Improvement Sequence
              </small>
              <small className="relative mt-2 text-[#6B7186]">
                Start a new performance improvement sequence based on an old
                session
              </small>
            </div>
            <div
              className={clsx(
                "h-5 w-5 min-w-5 border-2 rounded-full overflow-clip p-[0.15rem]",
                selected_screen !== PIScreens.NEW_PIS
                  ? "border-gray"
                  : "border-gunmetal"
              )}
            >
              <div
                className={clsx(
                  "h-full w-full bg-gunmetal rounded-full",
                  selected_screen !== PIScreens.NEW_PIS && "bg-transparent"
                )}
              />
            </div>
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-h-[35rem] border-0 p-0 overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="pb-4 p-4 font-medium sticky top-0 bg-white">
              <div className="flex justify-between text-left gap-4">
                <p className="big">
                  Create a New Performance Improvement Sequence
                </p>
                <svg
                  onClick={() => {
                    dispatch(
                      handleDialog({
                        dialog: {
                          new_pis_isopen: false,
                          session_confirmation: false,
                        },
                      })
                    );
                    dispatch(handleSelectedScreen(PIScreens.DEFAULT));
                    dispatch(handleActiveScreen());
                  }}
                  className="cursor-pointer"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7578 23.2438L18.0008 18.0008L23.2438 23.2438M23.2438 12.7578L17.9998 18.0008L12.7578 12.7578"
                    stroke="#262B3A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </AlertDialogTitle>

            <AlertDialogDescription className="space-y-4 p-4">
              {sessions.map((session, idx) => (
                <div
                  onClick={() => changeActive(idx)}
                  key={idx}
                  className="space-y-4"
                >
                  <div
                    className={clsx(
                      "flex justify-between p-4 border rounded-xl cursor-pointer items-center",
                      session.is_active
                        ? "bg-alice-blue border-black"
                        : "border-gray"
                    )}
                  >
                    <div className="space-y-1 text-left">
                      <p className="text-black">{session.session_name}</p>
                      <div className="flex divide-x gap-2">
                        <small className="small pr-2">{session.date}</small>
                        <small className="small">{session.duration}</small>
                      </div>
                    </div>
                    <h6>{session.impact}%</h6>
                  </div>
                  {session.is_active && (
                    <div className="space-y-2 text-left">
                      <small className="text-[#A06821]">
                        Enter New Sequence Name
                      </small>
                      <input
                        value={newSequenceName}
                        onChange={(e) => setNewSequenceName(e.target.value)}
                        className="mt-2 text-black"
                        placeholder="Type here"
                      />
                    </div>
                  )}
                </div>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="w-full flex justify-center items-center sticky border-t border-t-black/20 bottom-0 bg-white px-4 py-0 h-20">
            <div className="flex justify-between w-full">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: Math.max(prev.pageIndex - 1, 0),
                    }))
                  }
                  disabled={pagination.pageIndex === 0}
                  className="bg-transparent text-black disabled:opacity-40"
                >
                  <p>Previous</p>
                </button>

                <p className="size-8 rounded-full border flex items-center justify-center">
                  {pagination.pageIndex + 1}
                </p>

                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex: prev.pageIndex + 1,
                    }))
                  }
                  disabled={!data?.next}
                  className="bg-transparent text-black disabled:opacity-40"
                >
                  <p>Next</p>
                </button>
              </div>

              <AlertDialogAction
                className={clsx(
                  "px-10 py-2 h-12",
                  newSequenceName.trim().length == 0
                    ? "bg-gray-300"
                    : "bg-black"
                )}
                disabled={newSequenceName.trim().length == 0}
                onClick={() => {
                  const activeSession = sessions.find((s) => s.is_active);
                  if (!activeSession) return;

                  dispatch(
                    handleDialog({
                      dialog: {
                        new_pis_isopen: false,
                        session_confirmation: true,
                      },
                    })
                  );

                  dispatch(
                    updateNewPISData({
                      title: activeSession.session_name,
                      impact: activeSession.impact,
                      date: activeSession.date,
                      duration: activeSession.duration,
                      new_sequence_name: newSequenceName.trim(),
                    })
                  );
                }}
              >
                Continue
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Session Confirmation Dialog */}
      {dialog.session_confirmation && <SessionConfirmationDialog />}
    </div>
  );
}

export default NewPerformanceImprovementDialog;
