// interface IUser {
//     id: number;
//     email: string;
//     first_name: string;
//     last_name: string;
//     user_intent: string | null;
//     role: string | null;
//     purpose: string | null;
// }

export interface IEnterpriseUser {
    id: number;
    created_at: string;
    updated_at: string;
    enterprise_name: string;
    primary_color: string;
    secondary_color: string;
    favicon: string | null;
    logo: string | null;
    is_admin: boolean;
    role: string | null;
    team: string | null;
    user_type: string;

    enterprise: {
        id: number;
        name: string;
        domain: string;
        enterprise_type: string;
        sport_type: string;
        favicon: string | null;
        primary_color: string | null;
        secondary_color: string | null;
        logo: string | null;
    };

    progress: {
        user_id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };

    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        user_intent: string | null;
    };
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
