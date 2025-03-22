import ExistingSequenceCard from "./ExistingSequenceCard";
import { ExistingSequenceTable } from "./ExistingSequenceTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function SelectExistingSequence() {
  const { existing_sessions } = useSelector(
    (state: RootState) => state.performance_improvment
  );
  return (
    <main className="px-4 lg:px-10 pb-10 bg-[#F9F9F9] font-montreal mb-20">
      <div className="py-6 flex w-full gap-8 justify-between">
        <h6>Start a New Session or Improve a Past Session</h6>
        <button className="bg-transparent border border-dark-gray rounded-xl py-3 text-black">
          Cancel
        </button>
      </div>
      <div className="space-y-4">
        {existing_sessions.map((session, idx) => (
          <div>
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
