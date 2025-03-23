import { combineReducers } from "redux";
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
    dynamicDialog: dynamicDialogReducer,
    pitchPractice: pitchPracticeReducer,
    presentationPractice: presentationPracticeReducer,
    publicSpeakingForm: publicSpeakingFormReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
