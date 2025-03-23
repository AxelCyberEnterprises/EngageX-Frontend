import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import NewPerformanceImprovementDialog from "./NewPerformanceImprovementDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  PIScreens,
  handleActiveScreen,
  handleSelectedScreen,
} from "@/store/slices/performance_improvement_slice";
import clsx from "clsx";

function NewSession() {
  const dispatch = useDispatch();
  const selected_screen = useSelector(
    (state: RootState) => state.performance_improvment.selceted_screen
  );
  return (
    <section className="px-4 lg:px-10">
      <h6 className="my-6">Start a New Session or Improve a Past Session</h6>
      <div className="flex justify-between gap-8">
        <div className="border border-dark-gray rounded-lg p-6 space-y-4 h-max">
          <div className="flex gap-3 items-center">
            <svg
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 22C3.0625 22 2.47417 21.7554 1.985 21.2662C1.49583 20.7771 1.25083 20.1883 1.25 19.5V4.5C1.25 3.8125 1.495 3.22417 1.985 2.735C2.475 2.24583 3.06333 2.00083 3.75 2H26.25C26.9375 2 27.5263 2.245 28.0163 2.735C28.5063 3.225 28.7508 3.81333 28.75 4.5V19.5C28.75 20.1875 28.5054 20.7762 28.0163 21.2662C27.5271 21.7562 26.9383 22.0008 26.25 22H3.75ZM4.375 15.75H5.9375V11.375L9.125 15.75H10.625V8.25H9.0625V12.625L5.9375 8.25H4.375V15.75ZM11.875 15.75H16.875V14.1875H13.75V12.8125H16.875V11.25H13.75V9.8125H16.875V8.25H11.875V15.75ZM19.375 15.75H24.375C24.7292 15.75 25.0263 15.63 25.2663 15.39C25.5063 15.15 25.6258 14.8533 25.625 14.5V8.25H24.0625V13.875H22.6875V8.25H21.125V13.875H19.6875V8.25H18.125V14.5C18.125 14.8542 18.245 15.1512 18.485 15.3912C18.725 15.6312 19.0217 15.7508 19.375 15.75Z"
                fill="#64BA9F"
              />
            </svg>
            <h6>New Session</h6>
          </div>
          <small>
            Start a fresh training module designed to help you practice and
            improve your communication skills.
          </small>
        </div>

        <div className="p-6 border border-dark-gray space-y-8 rounded-lg">
          <div className="flex gap-4 items-center">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.11908 17.069C4.40468 14.1506 4.45268 9.57616 7.27268 6.73576C8.37768 5.61743 9.81484 4.88664 11.3695 4.65256L11.2867 2.16016C9.10405 2.42255 7.07484 3.41706 5.53028 4.98136C1.75148 8.78536 1.70588 14.9282 5.38268 18.8186L3.29348 20.921L9.90548 21.2822L9.88748 14.2814L7.11908 17.069ZM15.0955 2.71816L15.1135 9.71896L17.8819 6.93256C20.5963 9.85336 20.5483 14.4278 17.7283 17.2658C16.6233 18.3841 15.1861 19.1149 13.6315 19.349L13.7143 21.8402C15.8966 21.5765 17.9257 20.5827 19.4719 19.0202C23.2495 15.2138 23.2951 9.07096 19.6183 5.18296L21.7075 3.07816L15.0955 2.71816Z"
                fill="#64BA9F"
              />
            </svg>

            <h6>Improve Past Session</h6>
          </div>
          <div className="border border-dark-gray rounded-lg">
            <NewPerformanceImprovementDialog />
            <div
              onClick={() =>
                dispatch(handleSelectedScreen(PIScreens.EXISTING_PIS))
              }
              className={clsx(
                "flex items-center space-x-4 p-4 py-6 cursor-pointer",
                selected_screen == PIScreens.EXISTING_PIS && "bg-alice-blue"
              )}
            >
              <div className="h-5 w-5 min-w-5 border-2 border-black rounded-full overflow-clip p-[0.15rem]">
                <div
                  className={clsx(
                    "h-full w-full bg-black rounded-full",
                    selected_screen !== PIScreens.EXISTING_PIS &&
                      "bg-transparent"
                  )}
                />
              </div>
              <div className="flex flex-col">
                <small className="small font-semibold">
                  Exisiting Performance Improvement Sequence
                </small>
                <small className="relative mt-2">
                  Continue an existing Improvement on your performance in an
                  existing Sequence
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewSession;
