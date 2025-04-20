import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/authSlice";
import appReducer from "./features/app/appSlice";
import ideaReducer from "./features/idea/ideaSlice";
import ideaListReducer from "./features/ideaList/ideaListSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    idea: ideaReducer,
    ideaList: ideaListReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
