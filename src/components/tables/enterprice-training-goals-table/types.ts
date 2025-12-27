export interface IEnterpriseTrainingGoals {
    id: string | number;
    goal: string;
    organization: string;
    progress: number;
    target_sessions?: number; // Add this if API returns target_sessions
}
