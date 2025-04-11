import { use, useEffect, useState } from "react";
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
} from "@/store/slices/performance_improvement_slice";
import clsx from "clsx";
import { useSessionHistory } from "@/hooks/auth";

interface Sessions {
  session_name: string;
  completion_percentage: number;
  date: string;
  duration: string;
  new_sequence_name: string;
  is_active: boolean;
}

// const sessionsData: Sessions[] = [
//   {
//     title: "Pitch Presenation Session",
//     completion_percentage: 80,
//     date: "February 22, 2025",
//     time: "11:59 am",
//     new_sequence_name: "",
//     is_active: false,
//   },
//   {
//     title: "Pitch Presenation Session",
//     completion_percentage: 0,
//     date: "February 22, 2025",
//     time: "11:59 am",
//     new_sequence_name: "",
//     is_active: true,
//   },
//   {
//     title: "Idea Presenation Session",
//     completion_percentage: 0,
//     date: "February 22, 2025",
//     time: "11:59 am",
//     new_sequence_name: "",
//     is_active: false,
//   },
//   {
//     title: "Keynote Speaking Session",
//     completion_percentage: 0,
//     date: "February 22, 2025",
//     time: "11:59 am",
//     new_sequence_name: "",
//     is_active: false,
//   },
// ];

function NewPerformanceImprovementDialog() {
  const { data: sessionData } = useSessionHistory();
  const [sessions, setSessions] = useState<Sessions[]>([]);
  const dispatch = useDispatch();
  const { dialog, selected_screen } = useSelector(
    (state: RootState) => state.performance_improvment
  );

  useEffect(() => {
    if (!sessionData) return;
    let sessions = (sessionData as any).results as Sessions[];
    setSessions(sessions);
  }, [sessionData]);

  console.log("session: ", sessionData);

  const changeActive = (idx: number) => {
    setSessions((prevSessions) =>
      prevSessions.map((item, index) => ({
        ...item,
        is_active: idx === index,
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
              selected_screen == PIScreens.NEW_PIS &&
                "bg-alice-blue cursor-pointer"
            )}
          >
            <div className="flex text-left flex-col">
              <small className="small">
                New Performance Improvement Sequence
              </small>
              <small className="relative mt-2 text-[#6B7186]">
                Start a new performance Improvement sequence based on an old
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
        <AlertDialogContent className="max-h-[35rem] border-0 p-0 overflow-clip overflow-y-auto">
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
              <div className="mt-4 flex items-center border px-3 rounded-2xl border-gray">
                <svg
                  width="18"
                  height="18"
                  className="text-gray stroke-gray"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5846 13.5846L17.3346 17.3346M15.668 8.16797C15.668 6.17885 14.8778 4.27119 13.4713 2.86467C12.0647 1.45814 10.1571 0.667969 8.16797 0.667969C6.17885 0.667969 4.27119 1.45814 2.86467 2.86467C1.45814 4.27119 0.667969 6.17885 0.667969 8.16797C0.667969 10.1571 1.45814 12.0647 2.86467 13.4713C4.27119 14.8778 6.17885 15.668 8.16797 15.668C10.1571 15.668 12.0647 14.8778 13.4713 13.4713C14.8778 12.0647 15.668 10.1571 15.668 8.16797Z"
                    stroke="#262B3A"
                    stroke-width="0.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <input
                  className="outline-none border-0 text-black"
                  placeholder="Search session name"
                />
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
                        ? "bg-alice-blue border border-black"
                        : "border border-gray"
                    )}
                  >
                    <div className="space-y-1 text-left">
                      <p className="text-black">{session.session_name}</p>
                      <div className="flex divide-x gap-2">
                        <small className="small pr-2">{session.date}</small>
                        <small className="small">{session.duration}</small>
                      </div>
                    </div>
                    <h6>{session.completion_percentage}%</h6>
                  </div>
                  {session.is_active && (
                    <div className="space-y-2 text-left">
                      <small className="text-[#A06821]">
                        Enter New Sequence Name
                      </small>
                      <input
                        className="mt-2 text-black"
                        placeholder="Type here"
                      />
                    </div>
                  )}
                </div>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full sticky border-2 bottom-0 bg-white items-center flex mx-4 justify-start px-4 py-0 h-20">
            <AlertDialogAction
              className="px-10 py-2 h-12 mx-4"
              onClick={() =>
                dispatch(
                  handleDialog({
                    dialog: {
                      new_pis_isopen: false,
                      session_confirmation: true,
                    },
                  })
                )
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Second Dialog (Session Confirmation) */}
      {dialog.session_confirmation && <SessionConfirmationDialog />}
    </div>
  );
}

export default NewPerformanceImprovementDialog;
