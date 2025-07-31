// src/components/AccessGate.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unlock } from "../../store/slices/accessSlice";
import type { RootState } from "../../store";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const PASSWORD = "MLS1130";

const AccessGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const unlocked = useSelector((state: RootState) => state.access.unlocked);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === PASSWORD) {
            dispatch(unlock());
        } else {
            setError(true);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (unlocked) return <>{children}</>;

    return (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="text-center space-y-4 w-full max-w-sm">
                <h2 className="text-xl font-semibold">🔒 Access Denied</h2>
                <p>
                    Welcome to EngageX over the next 72 hours we will be enhancing the platform with some wonderful new
                    features. Since our customers are our 1st priority, we decided not to risk the user experience and
                    will republish on July 31st.{" "}
                </p>
                <Input
                    type="password"
                    className="border p-2 w-full text-center text-black"
                    placeholder="Enter password to continue"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">Incorrect password. Try again.</p>}
                <button type="submit" className="bg-black text-white px-4 py-3 rounded w-full">
                    Unlock
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="text-black bg-white border border-black px-4 py-2 rounded-md text-sm w-full"
                >
                    ← Go back
                </button>
            </form>
        </div>
    );
};

export default AccessGate;
