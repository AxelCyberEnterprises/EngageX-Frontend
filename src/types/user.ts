interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    user_intent: string | null;
    role: string | null;
    purpose: string | null;
}

export interface IEnterpriseUser {
    id: number;
    user: IUser;
    enterprise: number;
    enterprise_name: string;
    user_type: "general" | "rookie";
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}
