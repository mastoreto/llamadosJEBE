"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

const AuthProvider:React.FC<Props> = ({ children }):JSX.Element => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default AuthProvider;