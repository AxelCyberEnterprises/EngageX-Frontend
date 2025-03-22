import { combineReducers } from "redux";
import counterReducer from "./slices/counter";
import PerformanceImprovementReducer from "../store/slices/performance_improvement_slice";
import chatSliceReducer from "./slices/ChatbotSlice";
import authReducer from "./slices/authSlice";
import pitchPracticeReducer from "./slices/dashboard/user/pitchPracticeSlice";
import presentationPracticeReducer from "./slices/dashboard/user/presentationPracticeSlice";
import dynamicDialogReducer from "./slices/dynamicDialogSlice.ts";

const rootReducer = combineReducers({
  counter: counterReducer,
  chat: chatSliceReducer,
  auth: authReducer,
  performance_improvment: PerformanceImprovementReducer,
  dynamicDialog: dynamicDialogReducer,
  pitchPractice: pitchPracticeReducer,
  presentationPractice: presentationPracticeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
