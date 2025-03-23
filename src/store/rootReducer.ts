import { combineReducers } from "redux";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";
import chatSliceReducer from "./slices/ChatbotSlice";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counter";
import pitchPracticeReducer from "./slices/dashboard/user/pitchPracticeSlice";
import presentationPracticeReducer from "./slices/dashboard/user/presentationPracticeSlice";
import publicSpeakingFormReducer from "./slices/dashboard/user/publicSpeakingFormSlice";
import dynamicDialogReducer from "./slices/dynamicDialogSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    chat: chatSliceReducer,
    auth: authReducer,
    performance_improvment: PerformanceImprovementReducer,
    dynamicDialog: dynamicDialogReducer,
    pitchPractice: pitchPracticeReducer,
    presentationPractice: presentationPracticeReducer,
    publicSpeakingForm: publicSpeakingFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
