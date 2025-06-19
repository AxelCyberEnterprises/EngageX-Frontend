import { combineReducers } from "redux";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";
import chatSliceReducer from "./slices/ChatbotSlice";
import accessReducer from "./slices/accessSlice";
import authReducer from "./slices/authSlice";
import brandingReducer from "./slices/brandingSlice";
import counterReducer from "./slices/counter";
import pitchPracticeReducer from "./slices/dashboard/user/pitchPracticeSlice";
import presentationPracticeReducer from "./slices/dashboard/user/presentationPracticeSlice";
import dynamicDialogReducer from "./slices/dynamicDialogSlice";
import floatingChatbotReducer from "./slices/floatingChatbotSlice";
import profileReducer from "./slices/profileSlice";
import sessionReducer from "./slices/sessionSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    chat: chatSliceReducer,
    auth: authReducer,
    performance_improvement: PerformanceImprovementReducer,
    dynamicDialog: dynamicDialogReducer,
    pitchPractice: pitchPracticeReducer,
    presentationPractice: presentationPracticeReducer,
    session: sessionReducer,
    floating_chatbot: floatingChatbotReducer,
    profile: profileReducer,
    access: accessReducer,
    branding: brandingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
