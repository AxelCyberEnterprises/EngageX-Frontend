import UserDashboardSkeleton from "@/components/skeletons/UserDashboardSkeleton";
import { Button } from "@/components/ui/button";
import { useAddAuthQuestion, useDashboardData } from "@/hooks/auth";
import usePerformanceChart from "@/hooks/usePerformanceChart";
import { RootState } from "@/store";
import { ISession } from "@/types/sessions";
import { UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import practiceBg from "../../../assets/images/jpegs/practice-bg-dashboard.jpeg";
import presentationBg from "../../../assets/images/jpegs/presentation-bg.jpeg";
import speakingBg from "../../../assets/images/jpegs/speaking-bg.jpeg";
import improveBg from "../../../assets/images/pngs/improve-bg.png";
import cardFlower from "../../../assets/images/svgs/card-flower.svg";
import SegmentedProgressBar from "../../../components/dashboard/SegmentedProgressBar";
import SemiCircleProgress from "../../../components/dashboard/SemiCircleProgress";
import ShadLineChart from "../../../components/dashboard/ShadLineChart";
import MultiStepAgreement from "@/components/dashboard/agreementModal/modal";

interface DashboardData {
  latest_session_dict: {
    session_type: string;
    session_score: number;
  } | null;
  available_credit: number;
  goals_and_achievement: {
    audience_engagement: number;
    body_language: number;
    captured_impact: number;
    emotional_impact: number;
    language_and_word_choice: number;
    structure_and_clarity: number;
    transformative_communication: number;
    vocal_variety: number;
  };
  // performance_analytics?: Array<{
  //     chunk_number: string;
  //     impact: number;
  //     trigger_response: number;
  //     conviction: number;
  // }>;
  performance_analytics?: ISession["performance_analytics"];
  // Add other properties of the `data` object here if needed
}

const UserDashboardHome: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.data);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const { data, isLoading } = useDashboardData() as UseQueryResult<
    DashboardData,
    Error
  >;
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const agreementModalShown = localStorage.getItem('agreementModalShown');
    if ((user?.first_login || user?.first_time_verification) && !agreementModalShown) {
      setShowAgreementModal(true);
      localStorage.setItem('agreementModalShown', 'true');
    }
  }, [user?.first_login, user?.first_time_verification]);

  const [goalsData, setGoalsData] = useState({
    audience_engagement: 0,
    body_language: 0,
    captured_impact: 0,
    emotional_impact: 0,
    language_and_word_choice: 0,
    structure_and_clarity: 0,
    transformative_communication: 0,
    vocal_variety: 0,
  });
  useEffect(() => {
    const defaultGoalData = {
      audience_engagement: 0,
      body_language: 0,
      captured_impact: 0,
      emotional_impact: 0,
      language_and_word_choice: 0,
      structure_and_clarity: 0,
      transformative_communication: 0,
      vocal_variety: 0,
    };

    if (data?.goals_and_achievement) {
      setGoalsData(data?.goals_and_achievement);
    } else {
      setGoalsData(defaultGoalData);
    }
  }, [data]);

  const [goalFraction, setGoalFraction] = useState("0/0");
  useEffect(() => {
    const totalGoals = Object.keys(goalsData).length;
    const goalsAbove80 = Object.values(goalsData).filter((value) => value >= 8)
      .length;
    const fraction = `${goalsAbove80}/${totalGoals}`;
    setGoalFraction(fraction);
    console.log(`You have completed ${fraction} of your goals`);
  }, [goalsData]);
  const [numerator, denominator] = goalFraction.split("/").map(Number);
  const { mutate: authQuestions } = useAddAuthQuestion();
  // const userIdAfterSignup = useSelector((state: RootState) => state.auth.userIdAfterSignup);
  const userQuestions = JSON.parse(
    localStorage.getItem("userQuestions") || "{}"
  );
  const signupData = useSelector((state: RootState) => state.auth.signupData);
  console.log(userQuestions.role);
  console.log(signupData);
  useEffect(() => {
    if (profile?.user_intent && profile?.purpose) {
      authQuestions({
        userId: String(user?.user_id),
        purpose: signupData?.planQuestion.toLowerCase() ?? "",
        user_intent: signupData?.roleQuestion.toLowerCase() ?? "",
        email: user?.email,
        password: signupData?.password,
      });
    }
  }, []);
  const score = data?.latest_session_dict?.session_score || 0;
  // const agreementTrigger: number = data?.performance_analytics?.length || 0;

  const sessionType =
    data?.latest_session_dict?.session_type || "Public Speaking";
  const cardsData = [
    {
      image: speakingBg,
      title: "Public Speaking / Storytelling",
      text:
        "Improve delivery & structure with real-time AI feedback and Coaching expertise",
      buttonText: "Start Public Speaking",
      href: "./public-speaking",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.0013 4C7.3216 4 5.71069 4.66726 4.52296 5.85499C3.33523 7.04272 2.66797 8.65363 2.66797 10.3333V19.6667C2.66797 20.4623 2.98404 21.2254 3.54665 21.788C4.10926 22.3506 4.87232 22.6667 5.66797 22.6667H6.0013V20.6667H5.66797C5.40275 20.6667 5.1484 20.5613 4.96086 20.3738C4.77333 20.1862 4.66797 19.9319 4.66797 19.6667V10.3333C4.66797 9.18406 5.12451 8.08186 5.93717 7.2692C6.74983 6.45655 7.85203 6 9.0013 6H22.3346C22.5999 6 22.8542 6.10536 23.0417 6.29289C23.2293 6.48043 23.3346 6.73478 23.3346 7V7.33333H25.3346V7C25.3346 6.60603 25.257 6.21593 25.1063 5.85195C24.9555 5.48797 24.7345 5.15726 24.456 4.87868C24.1774 4.6001 23.8467 4.37913 23.4827 4.22836C23.1187 4.0776 22.7286 4 22.3346 4H9.0013ZM25.6733 8.66667H26.3346C27.0948 8.66657 27.8267 8.95506 28.3823 9.47383C28.9379 9.99259 29.2759 10.7029 29.328 11.4613L29.3346 11.6667V13.0053C29.3342 13.2586 29.2377 13.5022 29.0647 13.6871C28.8916 13.872 28.6548 13.9843 28.4021 14.0014C28.1495 14.0185 27.8997 13.9391 27.7033 13.7792C27.5069 13.6193 27.3785 13.3909 27.344 13.14L27.3346 13.0053V11.6667C27.3346 11.425 27.2471 11.1915 27.0883 11.0094C26.9294 10.8273 26.71 10.7089 26.4706 10.676L26.3346 10.6667H25.6733C25.4199 10.6666 25.176 10.5703 24.9909 10.3974C24.8058 10.2244 24.6932 9.9876 24.6759 9.73483C24.6587 9.48205 24.738 9.23214 24.8979 9.0356C25.0578 8.83906 25.2863 8.71054 25.5373 8.676L25.6733 8.66667ZM8.33464 15.3333C8.57649 15.3334 8.81012 15.4211 8.99227 15.5802C9.17442 15.7393 9.29273 15.959 9.3253 16.1987L9.33463 16.3347V19.66C9.33456 19.9134 9.23831 20.1573 9.06534 20.3424C8.89237 20.5275 8.65557 20.6401 8.40279 20.6574C8.15002 20.6746 7.90011 20.5953 7.70357 20.4354C7.50703 20.2755 7.3785 20.047 7.34397 19.796L7.33464 19.66V16.3347C7.33464 16.0695 7.43999 15.8151 7.62753 15.6276C7.81506 15.44 8.06942 15.3347 8.33464 15.3347M9.3253 22.8587C9.29077 22.6077 9.16224 22.3791 8.9657 22.2192C8.76916 22.0594 8.51925 21.98 8.26648 21.9973C8.0137 22.0146 7.7769 22.1271 7.60393 22.3123C7.43096 22.4974 7.33471 22.7413 7.33464 22.9947V24.3347L7.3413 24.54C7.39365 25.2981 7.73178 26.0082 8.28739 26.5267C8.843 27.0451 9.57468 27.3335 10.3346 27.3333H11.0013L11.1373 27.324C11.3883 27.2895 11.6168 27.1609 11.7767 26.9644C11.9366 26.7679 12.0159 26.5179 11.9987 26.2652C11.9814 26.0124 11.8688 25.7756 11.6837 25.6026C11.4986 25.4297 11.2547 25.3334 11.0013 25.3333H10.3346L10.1986 25.324C9.95923 25.2911 9.73982 25.1727 9.58099 24.9906C9.42216 24.8085 9.33465 24.575 9.33463 24.3333V22.9933L9.3253 22.8587ZM29.3346 22.9947C29.3346 22.7295 29.2293 22.4751 29.0417 22.2876C28.8542 22.1 28.5998 21.9947 28.3346 21.9947C28.0694 21.9947 27.8151 22.1 27.6275 22.2876C27.44 22.4751 27.3346 22.7295 27.3346 22.9947V24.3347C27.3346 24.5999 27.2293 24.8542 27.0417 25.0418C26.8542 25.2293 26.5998 25.3347 26.3346 25.3347H24.9973C24.7321 25.3347 24.4777 25.44 24.2902 25.6276C24.1027 25.8151 23.9973 26.0695 23.9973 26.3347C23.9973 26.5999 24.1027 26.8542 24.2902 27.0418C24.4777 27.2293 24.7321 27.3347 24.9973 27.3347H26.3346C26.7287 27.3347 27.1189 27.257 27.483 27.1062C27.8471 26.9553 28.1778 26.7342 28.4564 26.4555C28.735 26.1768 28.956 25.8459 29.1067 25.4818C29.2573 25.1177 29.3348 24.7274 29.3346 24.3333V22.9947ZM19.672 25.3333H21.6653C21.9187 25.3334 22.1626 25.4297 22.3477 25.6026C22.5328 25.7756 22.6454 26.0124 22.6627 26.2652C22.6799 26.5179 22.6006 26.7679 22.4407 26.9644C22.2808 27.1609 22.0523 27.2895 21.8013 27.324L21.6653 27.3333H19.672C19.4186 27.3333 19.1747 27.237 18.9896 27.064C18.8044 26.8911 18.6919 26.6543 18.6746 26.4015C18.6573 26.1487 18.7367 25.8988 18.8965 25.7023C19.0564 25.5057 19.285 25.3772 19.536 25.3427L19.672 25.3333ZM16.3293 25.3333H14.336L14.2 25.3427C13.949 25.3772 13.7204 25.5057 13.5605 25.7023C13.4007 25.8988 13.3213 26.1487 13.3386 26.4015C13.3559 26.6543 13.4684 26.8911 13.6536 27.064C13.8387 27.237 14.0826 27.3333 14.336 27.3333H16.3293L16.4653 27.324C16.7163 27.2895 16.9448 27.1609 17.1047 26.9644C17.2646 26.7679 17.3439 26.5179 17.3267 26.2652C17.3094 26.0124 17.1968 25.7756 17.0117 25.6026C16.8266 25.4297 16.5827 25.3334 16.3293 25.3333ZM29.3253 16.1987C29.2908 15.9477 29.1622 15.7191 28.9657 15.5592C28.7692 15.3994 28.5192 15.32 28.2665 15.3373C28.0137 15.3546 27.7769 15.4671 27.6039 15.6523C27.431 15.8374 27.3347 16.0813 27.3346 16.3347V19.66L27.344 19.796C27.3785 20.047 27.507 20.2755 27.7036 20.4354C27.9001 20.5953 28.15 20.6746 28.4028 20.6574C28.6556 20.6401 28.8924 20.5275 29.0653 20.3424C29.2383 20.1573 29.3346 19.9134 29.3346 19.66V16.3347L29.3253 16.1987ZM12.672 9.66667C12.672 9.40145 12.5666 9.1471 12.3791 8.95956C12.1915 8.77202 11.9372 8.66667 11.672 8.66667H10.3346C9.53899 8.66667 8.77592 8.98274 8.21332 9.54535C7.65071 10.108 7.33464 10.871 7.33464 11.6667V13.0053C7.33464 13.2705 7.43999 13.5249 7.62753 13.7124C7.81506 13.9 8.06942 14.0053 8.33464 14.0053C8.59985 14.0053 8.85421 13.9 9.04174 13.7124C9.22928 13.5249 9.33463 13.2705 9.33463 13.0053V11.6667C9.33463 11.4015 9.43999 11.1471 9.62753 10.9596C9.81506 10.772 10.0694 10.6667 10.3346 10.6667H11.672C11.9372 10.6667 12.1915 10.5613 12.3791 10.3738C12.5666 10.1862 12.672 9.93188 12.672 9.66667ZM20.3333 8.66667H22.3373C22.5907 8.66674 22.8346 8.76299 23.0197 8.93596C23.2048 9.10893 23.3174 9.34573 23.3347 9.59851C23.3519 9.85128 23.2726 10.1012 23.1127 10.2977C22.9528 10.4943 22.7243 10.6228 22.4733 10.6573L22.3373 10.6667H20.3333C20.0799 10.6666 19.836 10.5703 19.6509 10.3974C19.4658 10.2244 19.3532 9.9876 19.3359 9.73483C19.3187 9.48205 19.398 9.23214 19.5579 9.0356C19.7178 8.83906 19.9463 8.71054 20.1973 8.676L20.3333 8.66667ZM16.9946 8.66667H15.0013L14.8653 8.676C14.6143 8.71054 14.3858 8.83906 14.2259 9.0356C14.066 9.23214 13.9867 9.48205 14.0039 9.73483C14.0212 9.9876 14.1338 10.2244 14.3189 10.3974C14.504 10.5703 14.7479 10.6666 15.0013 10.6667H16.9946L17.1306 10.6573C17.3816 10.6228 17.6102 10.4943 17.7701 10.2977C17.9299 10.1012 18.0093 9.85128 17.992 9.59851C17.9747 9.34573 17.8622 9.10893 17.677 8.93596C17.4919 8.76299 17.248 8.66674 16.9946 8.66667Z"
            fill="#252A39"
          />
        </svg>
      ),
    },
    {
      image: presentationBg,
      title: "Presentation",
      text:
        "Improve delivery & structure with real-time AI feedback and Coaching expertise",
      buttonText: "Start Your Presentation",
      href: "./presentation-practice",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 5H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V22C3 22.5304 3.21071 23.0391 3.58579 23.4142C3.96086 23.7893 4.46957 24 5 24H9.92L7.21875 27.375C7.05299 27.5822 6.97633 27.8468 7.00563 28.1105C7.03493 28.3742 7.1678 28.6155 7.375 28.7812C7.5822 28.947 7.84676 29.0237 8.11049 28.9944C8.37421 28.9651 8.61549 28.8322 8.78125 28.625L12.48 24H19.52L23.2188 28.625C23.3008 28.7276 23.4023 28.813 23.5174 28.8764C23.6325 28.9398 23.7589 28.9799 23.8895 28.9944C24.0201 29.0089 24.1523 28.9975 24.2785 28.961C24.4046 28.9244 24.5224 28.8633 24.625 28.7812C24.7276 28.6992 24.813 28.5977 24.8764 28.4826C24.9398 28.3675 24.9799 28.2411 24.9944 28.1105C25.0089 27.9799 24.9975 27.8477 24.961 27.7215C24.9244 27.5954 24.8633 27.4776 24.7812 27.375L22.08 24H27C27.5304 24 28.0391 23.7893 28.4142 23.4142C28.7893 23.0391 29 22.5304 29 22V7C29 6.46957 28.7893 5.96086 28.4142 5.58579C28.0391 5.21071 27.5304 5 27 5ZM27 22H5V7H27V22Z"
            fill="#252A39"
          />
        </svg>
      ),
    },
    {
      image: practiceBg,
      title: "Pitch Practice",
      text:
        "Improve delivery & structure with real-time AI feedback and Coaching expertise",
      buttonText: "Start Pitching",
      href: "./pitch-practice",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_812_2033)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.0001 5.99998C18.0011 5.63192 17.9004 5.27073 17.7092 4.95625C17.5179 4.64178 17.2435 4.38625 16.9162 4.21785C16.589 4.04945 16.2215 3.97472 15.8545 4.00192C15.4874 4.02912 15.135 4.15719 14.8361 4.37198L9.75609 7.99198H4.99609C3.67001 7.99198 2.39824 8.51877 1.46056 9.45645C0.522878 10.3941 -0.00390625 11.6659 -0.00390625 12.992V18.992C-0.00390625 20.3181 0.522878 21.5898 1.46056 22.5275C2.39824 23.4652 3.67001 23.992 4.99609 23.992H9.75609L14.8361 27.612C15.1352 27.8252 15.4872 27.952 15.8535 27.9785C16.2199 28.005 16.5865 27.9302 16.9132 27.7624C17.2399 27.5945 17.5141 27.3399 17.7058 27.0266C17.8975 26.7133 17.9993 26.3533 18.0001 25.986V5.98598V5.99998ZM5.00009 9.99998H9.76009C10.1767 10 10.583 9.86999 10.9221 9.62798L16.0021 6.00798V26.008L10.9221 22.388C10.583 22.146 10.1767 22.0159 9.76009 22.016H5.00009C4.20444 22.016 3.44138 21.6999 2.87877 21.1373C2.31616 20.5747 2.00009 19.8116 2.00009 19.016V13.016C2.00009 12.2203 2.31616 11.4573 2.87877 10.8947C3.44138 10.3321 4.20444 10.016 5.00009 10.016V9.99998Z"
              fill="#252A39"
            />
            <path
              d="M23.0018 4.68004C23.0566 4.56066 23.1343 4.45323 23.2306 4.3639C23.3269 4.27456 23.4398 4.20507 23.5629 4.15938C23.6861 4.11369 23.817 4.09271 23.9482 4.09762C24.0795 4.10254 24.2085 4.13326 24.3278 4.18804C26.5888 5.22782 28.5044 6.89378 29.8478 8.98863C31.1912 11.0835 31.9061 13.5194 31.9078 16.008C31.9078 18.488 31.1958 20.928 29.8478 23.028C28.5052 25.1234 26.5893 26.7894 24.3278 27.828C24.0868 27.9386 23.8116 27.9489 23.5629 27.8567C23.3143 27.7644 23.1124 27.5771 23.0018 27.336C22.8912 27.095 22.8809 26.8198 22.9732 26.5711C23.0655 26.3225 23.2528 26.1206 23.4938 26.01C25.4095 25.1396 27.0292 23.7284 28.1538 21.95C29.2881 20.1763 29.8905 18.1148 29.8898 16.0095C29.8891 13.9041 29.2853 11.843 28.1498 10.07C27.0111 8.29625 25.3866 6.88702 23.4698 6.01004C23.3505 5.95528 23.243 5.87755 23.1537 5.78128C23.0644 5.68501 22.9949 5.57208 22.9492 5.44895C22.9035 5.32581 22.8825 5.19488 22.8874 5.06364C22.8923 4.9324 22.9231 4.80341 22.9778 4.68404L23.0018 4.68004Z"
              fill="#252A39"
            />
            <path
              d="M21.2005 10.3C21.3331 10.0703 21.5515 9.90276 21.8077 9.83412C22.0638 9.76548 22.3368 9.80142 22.5665 9.93402C23.6309 10.5473 24.5151 11.4302 25.13 12.4936C25.745 13.5571 26.0691 14.7638 26.0697 15.9923C26.0703 17.2208 25.7474 18.4278 25.1335 19.4919C24.5196 20.556 23.6363 21.4396 22.5725 22.054C22.3436 22.1782 22.0753 22.2082 21.8246 22.1377C21.574 22.0671 21.3607 21.9016 21.2302 21.6763C21.0997 21.4509 21.0622 21.1836 21.1258 20.9311C21.1893 20.6785 21.3489 20.4608 21.5705 20.324C22.3294 19.8844 22.9594 19.2529 23.3972 18.4929C23.8349 17.7329 24.0651 16.8711 24.0645 15.994C24.0639 15.1165 23.8324 14.2546 23.3932 13.4949C22.954 12.7352 22.3226 12.1044 21.5625 11.666C21.3328 11.5334 21.1652 11.315 21.0966 11.0588C21.0279 10.8026 21.0639 10.5297 21.1965 10.3H21.2005Z"
              fill="#252A39"
            />
          </g>
          <defs>
            <clipPath id="clip0_812_2033">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  const greenCheckSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9C2.01472 9 0 11.0147 0 13.5C0 15.9853 2.01472 18 4.5 18C6.98528 18 9 15.9853 9 13.5C9 15.9853 11.0147 18 13.5 18C15.9853 18 18 15.9853 18 13.5C18 11.0147 15.9853 9 13.5 9C15.9853 9 18 6.98528 18 4.5C18 2.01472 15.9853 0 13.5 0C11.0147 0 9 2.01472 9 4.5Z"
        fill="#64BA9E"
      />
    </svg>
  );

  const yellowSvg = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4.5C9 2.01472 6.98528 0 4.5 0C2.01472 0 0 2.01472 0 4.5C0 6.98528 2.01472 9 4.5 9C2.01472 9 0 11.0147 0 13.5C0 15.9853 2.01472 18 4.5 18C6.98528 18 9 15.9853 9 13.5C9 15.9853 11.0147 18 13.5 18C15.9853 18 18 15.9853 18 13.5C18 11.0147 15.9853 9 13.5 9C15.9853 9 18 6.98528 18 4.5C18 2.01472 15.9853 0 13.5 0C11.0147 0 9 2.01472 9 4.5Z"
        fill="#C29C81"
      />
    </svg>
  );
  const goals = [
    {
      title: "Vocal Variety",
      percent: 0,
      color: "#64BA9E",
    },
    {
      title: "Overall Captured Impact",
      percent: 0,
      color: "#64BA9E",
    },
    {
      title: "Emotional Impact",
      percent: 0,
      color: "#ECB25E",
    },
    {
      title: "Body Language",
      percent: 0,
      color: "#64BA9E",
    },
    {
      title: "Transformative Communication",
      percent: 0,
      color: "#64BA9E",
    },
    {
      title: "Audience Engagement",
      percent: 0,
      color: "#64BA9F",
    },
    {
      title: "Structure and Clarity",
      percent: 0,
      color: "#ECB25E",
    },
    {
      title: "Language and Word Choice",
      percent: 0,
      color: "#ECB25E",
    },
  ];
  const updatedGoals = goals.map((goal) => {
    const key = goal.title.toLowerCase().replace(/\s+/g, "_"); // e.g. "Audience Engagement" -> "audience_engagement"
    const rawValue = goalsData[key as keyof typeof goalsData];

    return {
      ...goal,
      percent: rawValue !== undefined ? rawValue * 10 : goal.percent,
    };
  });

  // function applyChunkOffset(arr: Array<{ [key: string]: any }>, chunkSize = 7, offset = 4) {
  //     return arr.map((item, index) => {
  //         const chunkOffset = (index + offset) * chunkSize;
  //         return {
  //             ...item,
  //             chunk_offset: chunkOffset,
  //             impact: item.impact,
  //             trigger: item.trigger_response,
  //             conviction: item.conviction,
  //         };
  //     });
  // }
  // const result: {
  //     chunk_offset: number;
  //     impact: number;
  //     trigger: number;
  //     conviction: number;
  // }[] = applyChunkOffset(data?.performance_analytics?.filter(Boolean) || [], 7);

  // const chartColors = {
  //     Impact: "#252A39",
  //     Trigger: "#40B869",
  //     Conviction: "#F5B546",
  // };
  const { chartColors, chartData } = usePerformanceChart({
    performanceAnalytics: data?.performance_analytics,
  });

  const [newChartData, setNewChartData] = useState([
    data?.performance_analytics ?? null,
  ]);
  useEffect(() => {
    console.log("newChartData: ", newChartData);
    console.log(setNewChartData);
  }, [newChartData]);

  if (isLoading) {
    return <UserDashboardSkeleton />;
  }

  return (
    <div className="user__dashboard__index p-4 md:px-8">
      {(score ?? 0) > 10 && (score ?? 0) <= 99 && (
        <p className="independence mb-5">
          You’re making progress! Pick up where you left off
        </p>
      )}

      {/* cards */}
      <div className="flex flex-wrap -mx-2 items-stretch">
        <div className="w-full lg:w-1/4 px-2 mb-3">
          <div className="index__card p-4 flex flex-col h-full justify-between rounded-[12px] relative overflow-hidden">
            <img
              src={cardFlower}
              alt="card flower background"
              className="absolute top-0 right-0 h-1/2"
            />
            <small className="independence mb-3.5">Session Credits</small>
            <h4 className="gunmetal mb-5.5">{data?.available_credit}</h4>
            <Link
              className="w-full"
              to={"/dashboard/user/settings?section=credits"}
            >
              {data?.available_credit === 0 ? (
                <button className="p-3 w-full rounded-md">Buy credits</button>
              ) : (
                <button className="p-3 w-full rounded-md">
                  Buy more credits
                </button>
              )}
            </Link>
          </div>
        </div>
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 lg:w-1/4 px-2 mb-3 hidden md:block"
          >
            <div
              className="index__card other__cards p-4 flex flex-col h-full justify-between rounded-[8px] relative overflow-hidden"
              style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${card.image})`,
              }}
            >
              <h6 className="text-white mb-4">{card.title}</h6>
              <small className="light__silver mb-5">{card.text}</small>
              <Link to={card.href}>
                <button className="p-3 w-full rounded-md">
                  {card.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-stretch my-6 md:hidden">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            to={card.href}
            className="w-1/3 p-2 flex flex-col items-center"
          >
            <div className="w-15 aspect-square icon__bg rounded-4xl flex items-center justify-center">
              {card.icon}
            </div>
            <p className="mt-3 gunmetal">{card.title}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/9 lg:pe-2 mb-3">
          {/* latest session score  */}
          <div className="session__score w-full p-5 rounded-[12px]">
            <p className="big mb-5">Your latest session score</p>
            <div className="mb-2 flex justify-between">
              <p className="dark__charcoal">{sessionType} Score</p>
              <p className="big">{score ?? 0}%</p>
            </div>
            <SegmentedProgressBar
              percent={score ?? 0}
              color="#40B869"
              divisions={5}
            />
            {(score ?? 0) > 10 && (
              <p className="dark__charcoal mt-6">
                ✊Keep going! You’re improving!
              </p>
            )}
            {(score ?? 0) === 100 && (
              <p className="dark__charcoal mt-6">
                👏 Bravo! You’ve reached the finish line!
              </p>
            )}
          </div>

          {/* improve past session  */}
          <div
            className="border-gray mt-4 p-5 border rounded-lg text-primary-blue relative bg-no-repeat bg-right-bottom"
            style={{ backgroundImage: `url(${improveBg})` }}
          >
            <h6 className="pb-3">Improve past session</h6>
            <p className="pb-3 text-auro-metal-saurus lg:w-10/12">
              Select any of your previous sessions to continue practicing with the same setup, allowing
              you to focus directly on enhancing your skills in specific areas.
            </p>
            <Link to="performance-improvement">
              <Button className="bg-[#173459] hover:bg-[#173459]/90 py-3">Improve Session</Button>
            </Link>
          </div>

          {/* performance analytics */}
          <div className="analytics px-5 py-7 mt-6 mb-4 rounded-[8px]">
            <div className="flex justify-between items-center mb-6">
              <p className="big chinese__black">Performance Analytics</p>
              <div className="flex items-center">
                {/* <select className="me-4 px-3 py-2 rounded-[8px]">
                  <option value="weekly">Past 7 Days</option>
                  <option value="monthly">Past Month</option>
                  <option value="yearly">Past Year</option>
                </select> */}
                <Link to="progress-tracking?section=Performance+Analysis">
                  <small className="underline cursor-pointer gunmetal">
                    View All
                  </small>
                </Link>
              </div>
            </div>
            {(user?.first_login || user?.first_time_verification) && (
              <MultiStepAgreement
                open={showAgreementModal}
                onClose={() => {
                  setShowAgreementModal(false);
                  localStorage.setItem('agreementModalShown', 'true');
                }}
              />
            )}
            <div className="chart__div">
              <ShadLineChart
                data={chartData.filter(Boolean).map((item) => ({
                  month: item.chunk_offset,
                  Impact: item.impact,
                  "Trigger Response": item.trigger,
                  Conviction: item.conviction,
                }))}
                colors={chartColors}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              <span className="text-[#40B869]">Trigger Response</span> is the
              audience’s engagement, where a trigger word or phrase evokes the
              audience to respond in some shape or form as a reaction to the
              information they've heard.
            </p>
          </div>
        </div>

        {/* goals and achievements */}
        <div className="w-full lg:w-3/9 lg:ps-2 mb-3 lg:mb-10">
          <div className="goals p-5 rounded-[12px]">
            <p className="chinese__black big mb-3">Your goals & achievements</p>
            <Link to="progress-tracking">
              <small className="underline gunmetal cursor-pointer">
                View All
              </small>
            </Link>

            <div className="progress__div relative flex flex-col items-center w-full mt-7 mb-6">
              <SemiCircleProgress
                percent={
                  (numerator ?? 0) / (denominator === 0 ? 1 : denominator)
                }
                color="#7387FF"
              />
              <h2 className="pt-20 mb-2">🎊</h2>
              <p className="mb-3">{numerator} goals completed</p>
              <h2 className="mb-3">{goalFraction}</h2>

              {numerator / denominator >= 5 / 8 &&
                numerator / denominator < 8 / 8 && (
                  <p className="gunmetal text-center">
                    Yay! you’ve achieved most of your goals
                  </p>
                )}
              {numerator / denominator === 8 / 8 && (
                <p className="gunmetal text-center">
                  Well done! You have completed 100% of your goals.
                </p>
              )}
              {/* {numerator / denominator < 5 / 8 && numerator/denominator >= 1/8 && (
                <p className="gunmetal text-center">
                  You have completed {goalFraction} of your goals.
                </p>
              )} */}
            </div>

            <div className="progress__bars__div">
              {updatedGoals?.map((goal, index) => (
                <div
                  key={index}
                  className="flex progress__bar__item mb-3 items-stretch justify-around"
                >
                  <div className="rounded-4xl w-12 icon__bg me-2 aspect-square flex items-center justify-center">
                    {goal.percent >= 80 ? greenCheckSvg : yellowSvg}
                  </div>
                  <div className="w-5/6 flex flex-col justify-between h-full">
                    <div className="flex justify-between mb-2 mt-1.5 dark__charcoal">
                      <small>{goal.title}</small>
                      <small>{goal.percent}%</small>
                    </div>
                    <div className="mt-1">
                      <SegmentedProgressBar
                        percent={goal.percent}
                        color={
                          goal.percent >= 80
                            ? "#64BA9E"
                            : goal.percent >= 10
                              ? "#ECB25E"
                              : "#C29C81"
                        }
                        divisions={10}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="progress-tracking">
              <Button className="bg-primary-blue hover:bg-primary-blue/90 py-3 w-full mt-6">
                View Goals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
