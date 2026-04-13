import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import GoogleProvider from "@/src/providers/GoogleProvider";

export const metadata = {
  title: "NowScore",
  description: "Provides Live Score of Football and Cricket",
};

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
        </main>
      </body>
    </html>
  );
}