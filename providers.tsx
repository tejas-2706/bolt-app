"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { dark } from '@clerk/themes'
import { Toaster } from "sonner";
import { AppSidebar } from "./components/AppSidebar";
export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ClerkProvider
        appearance={{ baseTheme: dark }}
    >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider>
                {/* Hover Trigger Area */}
                <div className={`group fixed top-0 left-0 h-full w-8 z-50 
                    `}>
                    {/* Sidebar */}
                    <div
                        className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 -translate-x-full group-hover:translate-x-0 z-40"
                    >
                        <AppSidebar />
                    </div>
                </div>

                <Navbar />
                {children}
                <Toaster />
            </Provider>
        </ThemeProvider>
    </ClerkProvider>
}



