
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { setAuthPageImage, setSignupData } from "../../store/slices/authSlice";
import { welcomeMessage } from "@/components/layouts/userAuth";
import { useLocation, useNavigate } from "react-router-dom";
import authPageImage2 from "@/assets/images/jpegs/authPage-image-2.jpeg"

const AuthQuestions: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<{ plan?: string; role?: string }>({});
    const signupData = useSelector((state: RootState) => state.auth.signupData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const questions = useSelector((state: RootState) => state.auth.questions);
        const location = useLocation()
                useEffect(()=>{
                    dispatch(setAuthPageImage(authPageImage2))
                },[location.pathname])

    // Separate the two question sets
    const planQuestion = questions.find((q) => q.question === "What do you plan on doing?");
    const roleQuestion = questions.find((q) => q.question === "What role are you?");

    const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>, questionType: "plan" | "role") => {
        const selectedContentId = e.target.value;
        
        // Find the selected option based on the question type
        const selectedOption = (questionType === "plan" ? planQuestion?.content : roleQuestion?.content)?.find(
            (option) => option.contentId === Number(selectedContentId)
        );
    
        if (selectedOption) {
            setSelectedOptions((prev) => ({ ...prev, [questionType]: selectedOption[questionType] }));
    
            dispatch(
                setSignupData({
                    ...signupData,
                    [`${questionType}Question`]: selectedOption[questionType] || "",
                }),
            );
        }
    };
    const handleContinue = () => {
        if (!selectedOptions.plan || !selectedOptions.role) {
            return;
        }
        navigate("../Tutorial");
    };

    return (
        <div className="flex flex-col my-5 md:justify-center md:pt-12 scrollbar-hide overflow-y-auto scroll-smooth h-[100dvh] md:pb-10  lg:w-4/5 md:mx-auto max-lg:p-5">
            {welcomeMessage()}
            <div className="font-[Montserrat] mt-10 w-full md:w-[80%] mx-auto lg:w-full md:mt-0 space-y-8">
                {/* Plan Question */}
                {planQuestion && (
                    <div>
                        <p className="text-[#344054]">{planQuestion.question}</p>
                        <div className="mt-3 w-full flex flex-col md:flex-row gap-4 space-y-">
                            {planQuestion.content.map((option) => {
                                const isSelected = selectedOptions.plan === option.plan;

                                return (
                                    <label
                                        key={option.contentId}
                                        className={`flex items-center text-sm px-3 py-3 w-full rounded-lg border cursor-pointer ${
                                            isSelected
                                                ? "bg-[#2154cb11] text-[#2154cb]"
                                                : "text-black bg-white border-[#b7b7b7]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="plan"
                                            value={option.contentId}
                                            className="mt-0 mb-0 w-fit accent-[#2154cb]"
                                            checked={isSelected}
                                            onChange={(e) => handleInputContent(e, "plan")}
                                        />
                                        <span className="ml-2">{option.plan}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Role Question */}
                {roleQuestion && (
                    <div className="-mt-2">
                        <p className="text-[#344054]">{roleQuestion.question}</p>
                        <div className="mt-3 w-full md:flex-row justify-center items-center mx-auto grid-cols-2 gap-2 flex-wrap flex flex-col space-y-4">
                            {roleQuestion.content.map((option) => {
                                const isSelected = selectedOptions.role === option.role;

                                return (
                                    <label
                                        key={option.contentId}
                                        className={`flex items-center  md:max-w-[48%] ${option.contentId === 7 && "md:max-w-max"} text-sm px-3 py-3 w-full max-w-fi rounded-lg border cursor-pointer ${
                                            isSelected
                                                ? "bg-[#2154cb11] text-[#2154cb]"
                                                : "text-black bg-white border-[#b7b7b7]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={option.contentId}
                                            className="mt-0 mb-0 w-fit accent-[#2154cb]"
                                            checked={isSelected}
                                            onChange={(e) => handleInputContent(e, "role")}
                                        />
                                        <span className="ml-2">{option.role}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={handleContinue}
                className={`w-full md:w-[80%]  ${(!selectedOptions.plan || !selectedOptions.role) ? "bg-[#3d3d3d62] hover:bg-[#3d3d3d62] cursor-not-allowed" : " hover:bg-accent-foreground  "} mx-auto lg:w-full rounded-lg font-[montserrat] mt-7 py-4 text-white`}
            >
                Continue
            </button>
        </div>
    );
};

export default AuthQuestions;