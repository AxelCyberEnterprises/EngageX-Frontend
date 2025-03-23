import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { handleDialog } from "@/store/slices/performance_improvement_slice";

function SessionConfirmationDialog() {
  const dispatch = useDispatch();
  const dialog = useSelector(
    (state: RootState) => state.performance_improvment.dialog
  );
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
      <AlertDialogContent className="p-0 overflow-clip">
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
                You are about to use 3 credits
              </p>
            </div>
          </div>
          <AlertDialogDescription className="px-6">
            <div className="py-5 text-left">
              <p className="text-black text-left">
                You are about to begin your session
              </p>
              <small className="text-left">
                Review your session details carefully before starting
              </small>
            </div>
            <div className="space-y-6 divide-y text-left">
              <div className="flex gap-x-4 items-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.9438 5.3875C25.0188 2.0875 20.7625 0 16 0C7.1625 0 0 7.1625 0 16H4C4 9.36875 9.36875 4 16 4C19.6562 4 22.9 5.65625 25.0938 8.2375L21.3312 12H32V1.33125L27.9438 5.3875ZM16 28C12.3438 28 9.1 26.3438 6.90625 23.7625L10.6687 20H0V30.6688L4.05625 26.6125C6.98125 29.9125 11.2437 32 16 32C24.8375 32 32 24.8375 32 16H28C28 22.6313 22.6313 28 16 28Z"
                    fill="#64BA9F"
                  />
                </svg>
                <div className="space-y-4 pb-2">
                  <small>Session Type</small>
                  <p className="text-black">Pitch Presentation</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.52299 29.1275C4.76703 29.1275 4.13632 28.8748 3.63089 28.3693C3.12545 27.8639 2.87219 27.2327 2.87109 26.4756V5.52299C2.87109 4.76703 3.12436 4.13632 3.63089 3.63089C4.13742 3.12545 4.76812 2.87219 5.52299 2.87109H26.4772C27.2321 2.87109 27.8628 3.12436 28.3693 3.63089C28.8759 4.13742 29.1286 4.76812 29.1275 5.52299V26.4772C29.1275 27.2321 28.8748 27.8628 28.3693 28.3693C27.8639 28.8759 27.2327 29.1286 26.4756 29.1275H5.52299ZM5.52299 27.4865H15.1788V4.51212H5.52299C5.27027 4.51212 5.03834 4.61714 4.8272 4.8272C4.61605 5.03725 4.51103 5.26918 4.51212 5.52299V26.4772C4.51212 26.7289 4.61714 26.9603 4.8272 27.1714C5.03725 27.3825 5.26863 27.4876 5.52135 27.4865M16.8198 27.4865H26.4772C26.7289 27.4865 26.9603 27.3815 27.1714 27.1714C27.3825 26.9613 27.4876 26.7294 27.4865 26.4756V15.9993H16.8198V27.4865ZM16.8198 14.3583H27.4865V5.52299C27.4865 5.27027 27.3815 5.03834 27.1714 4.8272C26.9613 4.61605 26.7294 4.51103 26.4756 4.51212H16.8198V14.3583Z"
                    fill="#64BA9F"
                  />
                </svg>

                <div className="space-y-4 pb-2">
                  <small>Virtual Environment</small>
                  <p className="text-black">Conference Hall</p>
                </div>
              </div>
              <div className="flex gap-x-4 items-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0013 20.0013C16.3791 20.0013 16.696 19.8733 16.952 19.6173C17.208 19.3613 17.3355 19.0449 17.3346 18.668C17.3337 18.2911 17.2057 17.9746 16.9506 17.7186C16.6955 17.4626 16.3791 17.3346 16.0013 17.3346C15.6235 17.3346 15.3071 17.4626 15.052 17.7186C14.7969 17.9746 14.6689 18.2911 14.668 18.668C14.6671 19.0449 14.7951 19.3617 15.052 19.6186C15.3089 19.8755 15.6253 20.0031 16.0013 20.0013ZM16.0013 14.668C16.3791 14.668 16.696 14.54 16.952 14.284C17.208 14.028 17.3355 13.7115 17.3346 13.3346V8.0013C17.3346 7.62352 17.2066 7.30708 16.9506 7.05197C16.6946 6.79686 16.3782 6.66886 16.0013 6.66797C15.6244 6.66708 15.308 6.79508 15.052 7.05197C14.796 7.30886 14.668 7.6253 14.668 8.0013V13.3346C14.668 13.7124 14.796 14.0293 15.052 14.2853C15.308 14.5413 15.6244 14.6689 16.0013 14.668ZM8.0013 24.0013L4.93464 27.068C4.51242 27.4902 4.02886 27.5849 3.48397 27.352C2.93908 27.1191 2.66708 26.7022 2.66797 26.1013V5.33464C2.66797 4.6013 2.9293 3.97375 3.45197 3.45197C3.97464 2.93019 4.60219 2.66886 5.33464 2.66797H26.668C27.4013 2.66797 28.0293 2.9293 28.552 3.45197C29.0746 3.97464 29.3355 4.60219 29.3346 5.33464V21.3346C29.3346 22.068 29.0737 22.696 28.552 23.2186C28.0302 23.7413 27.4022 24.0022 26.668 24.0013H8.0013ZM6.86797 21.3346H26.668V5.33464H5.33464V22.8346L6.86797 21.3346Z"
                    fill="#64BA9F"
                  />
                </svg>

                <div className="space-y-4 pb-2">
                  <small>AI Questions</small>
                  <p className="text-black">Enabled</p>
                </div>
              </div>

              <div className="pb-2">
                <small>Phases</small>
                <div className="flex gap-4 mt-4">
                  <p className="xs p-1 px-5 rounded-full bg-gray">
                    Intoduction
                  </p>
                  <p className="xs p-1 px-5 rounded-full bg-gray">Body</p>
                  <p className="xs p-1 px-5 rounded-full bg-gray">Conclusion</p>
                </div>
              </div>

              <small className="p-4 w-full flex bg-alice-blue rounded-lg">
                Estimated Session Duration: <p className="ml-2">25 minutes</p>
              </small>
            </div>

            <div className="flex items-center justify-end py-8 gap-4">
              <button
                className="rounded-full py-3 bg-transparent text-black border"
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
              <button className="rounded-full py-3">Begin Session</button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SessionConfirmationDialog;
