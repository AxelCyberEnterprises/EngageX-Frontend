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
  const { selected_screen, active_screen } = useSelector(
    (state: RootState) => state.performance_improvement
  );
  return (
    <section className="px-4 lg:px-10 space-y-4 font-montreal">
      <div className="flex justify-between items-center">
        <h6 className="my-6">Improve a past session</h6>
        <button
          onClick={() => {
            if (active_screen == PIScreens.EXISTING_PIS) {
              dispatch(handleSelectedScreen(PIScreens.DEFAULT));
              dispatch(handleActiveScreen());
            }
          }}
          className="px-6 py-2 h-12 rounded-2xl bg-transparent text-gunmetal border border-gray"
        >
          Cancel
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 rounded-lg">
        <NewPerformanceImprovementDialog />
        <div
          onClick={() => dispatch(handleSelectedScreen(PIScreens.EXISTING_PIS))}
          className={clsx(
            "flex items-center border rounded-2xl justify-between border-dark-gray overflow-clip w-full space-x-4 p-4 py-6 cursor-pointer",
            selected_screen == PIScreens.EXISTING_PIS && "bg-alice-blue"
          )}
        >
          <div className="flex flex-col">
            <small className="small">
              Existing Performance Improvement Sequence
            </small>
            <small className="relative mt-2 text-[#6B7186]">
              Continue an existing Improvement on your performance in an
              existing Sequence
            </small>
          </div>
          <div
            className={clsx(
              "h-5 w-5 min-w-5 border-2 rounded-full overflow-clip p-[0.15rem]",
              selected_screen !== PIScreens.EXISTING_PIS
                ? "border-gray"
                : "border-gunmetal"
            )}
          >
            <div
              className={clsx(
                "h-full w-full bg-black rounded-full",
                selected_screen !== PIScreens.EXISTING_PIS && "bg-transparent"
              )}
            />
          </div>
        </div>
      </div>
      <button
        className={clsx(
          "text-white px-10 py-2 h-12 rounded-2xl",
          selected_screen == PIScreens.DEFAULT
            ? "bg-gray cursor-none"
            : "bg-black cursor-pointer"
        )}
        disabled={selected_screen == PIScreens.DEFAULT}
        onClick={() => dispatch(handleActiveScreen())}
      >
        Continue
      </button>
    </section>
  );
}

export default NewSession;
