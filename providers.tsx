"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { dark } from '@clerk/themes'
import { Toaster } from "sonner";
export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ClerkProvider 
    appearance={{baseTheme: dark}}
    >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider>
            <Navbar/>
                {children}
                <Toaster/>
            </Provider>
        </ThemeProvider>
    </ClerkProvider>
}
