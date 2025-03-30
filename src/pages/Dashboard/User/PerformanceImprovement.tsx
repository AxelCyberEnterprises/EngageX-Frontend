import NewSession from "@/components/dashboard/performance-improvement/NewSession";
import SelectExistingSequence from "@/components/dashboard/performance-improvement/SelectExistingSequence";
import { RootState } from "@/store";
import { PIScreens } from "@/store/slices/performance_improvement_slice";
import { useDispatch, useSelector } from "react-redux";

function PerformanceImprovement() {
  const dispatch = useDispatch();
  const { active_screen, selected_screen } = useSelector(
    (state: RootState) => state.performance_improvment
  );
  return (
    <main className="relative">
      {active_screen != PIScreens.EXISTING_PIS && <NewSession />}
      {active_screen == PIScreens.EXISTING_PIS && <SelectExistingSequence />}
    </main>
  );
}

export default PerformanceImprovement;
