export interface IEnterpriseTrainingGoals {
    id: string | number;
    goal: string;
    organization: string;
    progress: number;
    target_sessions?: number;
    completed_sessions?: number;
}
