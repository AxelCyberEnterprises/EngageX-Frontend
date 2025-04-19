import { combineReducers } from "redux";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";
import chatSliceReducer from "./slices/ChatbotSlice";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counter";
import pitchPracticeReducer from "./slices/dashboard/user/pitchPracticeSlice";
import presentationPracticeReducer from "./slices/dashboard/user/presentationPracticeSlice";
import dynamicDialogReducer from "./slices/dynamicDialogSlice";
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
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
