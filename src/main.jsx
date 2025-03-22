import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/DatePicker/styles/index.css";
import "rsuite/DateRangePicker/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import APIProvider from "./context/APIProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <APIProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toaster />
    </APIProvider>
  </React.StrictMode>
);
