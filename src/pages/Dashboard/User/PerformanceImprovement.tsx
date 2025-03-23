import NewSession from "@/components/dashboard/performance-improvement/NewSession";
import SelectExistingSequence from "@/components/dashboard/performance-improvement/SelectExistingSequence";
import { RootState } from "@/store";
import {
  PIScreens,
  handleActiveScreen,
  handleSelectedScreen,
} from "@/store/slices/performance_improvement_slice";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

function PerformanceImprovement() {
  const dispatch = useDispatch();
  const { active_screen, selceted_screen } = useSelector(
    (state: RootState) => state.performance_improvment
  );
  return (
    <main className="relative">
      {active_screen != PIScreens.EXISTING_PIS && <NewSession />}
      {active_screen == PIScreens.EXISTING_PIS && <SelectExistingSequence />}

      <div className="bg-white flex w-[100vw] right-0 px-10 justify-end py-6 border-t fixed bottom-0">
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (active_screen == PIScreens.EXISTING_PIS) {
                dispatch(handleSelectedScreen(PIScreens.DEFAULT));
                dispatch(handleActiveScreen());
              }
            }}
            className="text-black bg-transparent border-2"
          >
            Cancel
          </button>
          <button
            className={clsx(
              "text-white",
              selceted_screen == PIScreens.DEFAULT
                ? "bg-gray cursor-none"
                : "bg-black cursor-pointer"
            )}
            disabled={selceted_screen == PIScreens.DEFAULT}
            onClick={() => dispatch(handleActiveScreen())}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}

export default PerformanceImprovement;
