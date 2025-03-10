"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "jotai";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ClerkProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider>
            <Navbar/>
                {children}
            </Provider>
        </ThemeProvider>
    </ClerkProvider>
}
