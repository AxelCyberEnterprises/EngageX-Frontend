import SetTrainingGoalForm from "@/components/forms/SetTrainingGoalForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SetTrainingGoals = () => {
    const navigate = useNavigate();
    
    return (
        <section className="px-4 py-3 flex flex-col lg:w-7/10 mx-auto gap-y-8">
            <div className="flex items-center justify-between">
                <h6 className="text-2xl">Set Training Goal</h6>
                <Button variant="outline" className="text-primary-blue border-bright-gray" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>

            <SetTrainingGoalForm />
        </section>
    );
};

export default SetTrainingGoals;
