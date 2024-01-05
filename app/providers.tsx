'use client';

import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({children}: ProvidersProps){
    console.log("IN PROVIDERS LINE 10");
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}