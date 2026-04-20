"use client";

import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import GoogleProvider from "@/src/providers/GoogleProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <main>
          <GoogleProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </QueryClientProvider>
          </GoogleProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </main>
      </body>
    </html>
  );
}