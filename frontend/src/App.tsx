import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./hooks/AuthContext";
const App: React.VFC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        // cacheの保持時間
        staleTime: 300000,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ToastContainer hideProgressBar={true} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
};

export default App;
