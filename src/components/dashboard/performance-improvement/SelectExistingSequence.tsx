import {
  PIScreens,
  Sequence,
  handleActiveScreen,
  handleSelectedScreen,
  setExistingSequence,
} from "@/store/slices/performance_improvement_slice";
import ExistingSequenceCard from "./ExistingSequenceCard";
import { ExistingSequenceTable } from "./ExistingSequenceTable";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetSequences } from "@/hooks/sessions";
import { useEffect } from "react";

function SelectExistingSequence() {
  const sequences = useGetSequences();
  console.log("sequences: ", sequences.data);
  const { existing_sequences, active_screen } = useSelector(
    (state: RootState) => state.performance_improvement
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!sequences.data) return;

    const updatedSequences = ((sequences.data as unknown) as Sequence[]).map(
      (seq) => ({
        ...seq,
        is_active: false,
      })
    );

    dispatch(setExistingSequence(updatedSequences));
  }, [sequences.data, dispatch]);

  return (
    <main className="px-4 lg:px-10 pb-10 bg-[#F9F9F9] font-montreal mb-20">
      <div className="py-6 flex w-full gap-8 justify-between items-center">
        <div>
          <h6 className="pb-1">Improve a past session</h6>
          <small className="text-[#474D63] hidden">
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
        {existing_sequences.map((sequence, idx) => (
          <div className="space-y-4">
            <ExistingSequenceCard key={idx} sequence={sequence} idx={idx} />
            {sequence.is_active && (
              <ExistingSequenceTable sessions={sequence.sessions} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default SelectExistingSequence;
