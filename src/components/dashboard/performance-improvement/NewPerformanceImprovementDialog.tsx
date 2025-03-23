import { useState } from "react";
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

interface Sessions {
  title: string;
  completion_percentage: number;
  date: string;
  time: string;
  new_sequence_name: string;
  is_active: boolean;
}

const sessionsData: Sessions[] = [
  {
    title: "Pitch Presenation Session",
    completion_percentage: 80,
    date: "February 22, 2025",
    time: "11:59 am",
    new_sequence_name: "",
    is_active: false,
  },
  {
    title: "Pitch Presenation Session",
    completion_percentage: 0,
    date: "February 22, 2025",
    time: "11:59 am",
    new_sequence_name: "",
    is_active: true,
  },
  {
    title: "Idea Presenation Session",
    completion_percentage: 0,
    date: "February 22, 2025",
    time: "11:59 am",
    new_sequence_name: "",
    is_active: false,
  },
  {
    title: "Keynote Speaking Session",
    completion_percentage: 0,
    date: "February 22, 2025",
    time: "11:59 am",
    new_sequence_name: "",
    is_active: false,
  },
];

function NewPerformanceImprovementDialog() {
  const [sessions, setSessions] = useState(sessionsData);
  const dispatch = useDispatch();
  const { dialog, selceted_screen } = useSelector(
    (state: RootState) => state.performance_improvment
  );

  const changeActive = (idx: number) => {
    setSessions((prevSessions) =>
      prevSessions.map((item, index) => ({
        ...item,
        is_active: idx === index,
      }))
    );
  };

  return (
    <>
      {/* First Dialog */}
      <AlertDialog open={dialog.new_pis_isopen}>
        <AlertDialogTrigger className="bg-transparent p-0 m-0 text-black text-left">
          <div
            onClick={() => dispatch(handleSelectedScreen(PIScreens.NEW_PIS))}
            className={clsx(
              "flex items-center space-x-4 p-4 py-6",
              selceted_screen == PIScreens.NEW_PIS &&
                "bg-alice-blue cursor-pointer"
            )}
          >
            <div className="h-5 w-5 min-w-5 border-2 border-black rounded-full overflow-clip p-[0.15rem]">
              <div
                className={clsx(
                  "h-full w-full bg-black rounded-full",
                  selceted_screen !== PIScreens.NEW_PIS && "bg-transparent"
                )}
              />
            </div>
            <div className="flex flex-col">
              <small className="small font-semibold">
                New Performance Improvement Sequence
              </small>
              <small className="relative mt-2">
                Start a new performance Improvement sequence based on an old
                session
              </small>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-h-[35rem] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="pb-4 font-medium flex justify-between">
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
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div>
                <input className="" placeholder="Type here" />
              </div>

              {sessions.map((session, idx) => (
                <div
                  onClick={() => changeActive(idx)}
                  key={idx}
                  className="space-y-4"
                >
                  <div
                    className={clsx(
                      "flex justify-between p-4 border rounded-xl cursor-pointer items-center",
                      session.is_active && "bg-alice-blue border-2 border-black"
                    )}
                  >
                    <div className="space-y-1">
                      <p className="text-black">{session.title}</p>
                      <div className="flex divide-x gap-2">
                        <small className="small pr-2">{session.date}</small>
                        <small className="small">{session.time}</small>
                      </div>
                    </div>
                    <h6>{session.completion_percentage}%</h6>
                  </div>
                  {session.is_active && (
                    <div className="space-y-2">
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
          <AlertDialogFooter className="w-full flex items-start justify-start relative mb-16">
            {/* Instead of nesting, open the second dialog via state */}
            <AlertDialogAction
              className="mt-3 absolute left-0"
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
    </>
  );
}

export default NewPerformanceImprovementDialog;
