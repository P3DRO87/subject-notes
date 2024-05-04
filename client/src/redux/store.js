import {
   legacy_createStore as createStore,
   combineReducers,
   compose,
   applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { testReducer } from "./testDux";
import { uiReducer } from "./ui";
import { quickNotesReducer } from "./quickNotesDux";
import { signatureReducer } from "./SignaturesDux";
import { tasksReducer } from "./tasksDux";
import { filesReducer } from "./filesDux";
import { eventsReducer } from "./eventsDux";
import { userReducer } from "./userDux";

// Note: all file with the suffix "Dux" are using the redux duck pattern

const rootReducer = combineReducers({
   test: testReducer,
   ui: uiReducer,
   user: userReducer,
   quickNotes: quickNotesReducer,
   signatures: signatureReducer,
   tasks: tasksReducer,
   files: filesReducer,
   events: eventsReducer,
});

export default function generateStore() {
   let composeEnhancers;

   if (typeof window === "undefined") {
      composeEnhancers = compose;

      return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
   }

   composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || function () {};

   return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export const reduxWrapper = createWrapper(generateStore);
