import {
  PIScreens,
  handleActiveScreen,
  handleSelectedScreen,
} from "@/store/slices/performance_improvement_slice";
import ExistingSequenceCard from "./ExistingSequenceCard";
import { ExistingSequenceTable } from "./ExistingSequenceTable";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

function SelectExistingSequence() {
  const { existing_sessions, active_screen } = useSelector(
    (state: RootState) => state.performance_improvement
  );
  const dispatch = useDispatch();
  return (
    <main className="px-4 lg:px-10 pb-10 bg-[#F9F9F9] font-montreal mb-20">
      <div className="py-6 flex w-full gap-8 justify-between items-center">
        <div>
          <h6 className="pb-1">Improve a past session</h6>
          <small className="text-[#474D63]">
            Need help setting up?{" "}
            <span className="text-pantone-green">Click here</span>
          </small>
        </div>
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
      <div className="space-y-6">
        {existing_sessions.map((session, idx) => (
          <div className="space-y-4">
            <ExistingSequenceCard key={idx} session={session} idx={idx} />
            {session.is_active && (
              <ExistingSequenceTable sequences={session.sequences} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default SelectExistingSequence;
