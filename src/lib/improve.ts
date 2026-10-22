import { BaseSessionSetupSchema } from "@/schemas/dashboard/user";
import { ISession } from "@/types/sessions";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";

type BaseValues = z.infer<typeof BaseSessionSetupSchema>;

/** The setup of a past session, carried to the practice page when the user presses Improve. */
export interface ImproveSetup {
    session_name: string;
    session_type: ISession["session_type"];
    virtual_environment: string;
    goals: string[];
    notes?: string;
    enterprise_settings?: {
        enterprise_type?: string;
        rookie_type?: string;
        sport_type?: string;
    };
    /** The improvement sequence the new session joins. Added once the sequence exists. */
    sequence?: string;
}

export const buildImproveSetup = (session: ISession): ImproveSetup => ({
    session_name: session.session_name,
    session_type: session.session_type,
    virtual_environment: session.virtual_environment,
    goals: (session.goals ?? []).filter(Boolean),
    notes: session.note ?? undefined,
    enterprise_settings: session.enterprise_settings ?? undefined,
});

/** The setup page for the type of room the past session was held in. */
export const getImproveRoute = ({ session_type, enterprise_settings }: ImproveSetup) => {
    switch (session_type) {
        case "public":
            return "/dashboard/user/public-speaking";
        case "pitch":
            return "/dashboard/user/pitch-practice";
        case "presentation":
            return "/dashboard/user/presentation-practice";
        default:
            return enterprise_settings?.enterprise_type === "rookie"
                ? "/dashboard/user/the-rookie-room"
                : "/dashboard/user/the-coaching-room";
    }
};

export type ImproveFormDefaults = Partial<
    Pick<BaseValues, "session_name" | "virtual_environment" | "goals" | "notes" | "sequence">
> & { enterprise_settings?: ImproveSetup["enterprise_settings"] };

/**
 * Prefilled setup for a practice form when the user arrived from Improve.
 * Returns undefined on a normal visit, or when the setup is for a different type of room.
 */
export const useImproveDefaults = (expectedType: ISession["session_type"]): ImproveFormDefaults | undefined => {
    const { state } = useLocation();
    const setup = state?.improve as ImproveSetup | undefined;

    return useMemo(() => {
        if (!setup || setup.session_type !== expectedType) return undefined;

        const goals = setup.goals.map((goal, index) => ({ id: index + 1, goal }));

        return {
            session_name: setup.session_name,
            virtual_environment: setup.virtual_environment as BaseValues["virtual_environment"],
            ...(goals.length > 0 && { goals }),
            ...(setup.notes && { notes: setup.notes }),
            ...(setup.sequence && { sequence: setup.sequence }),
            enterprise_settings: setup.enterprise_settings,
        };
    }, [setup, expectedType]);
};
