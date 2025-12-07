"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/_atoms/loadingOverlay/LoadingOverlay";

export default function NotLoggedIn({ children }: { children: React.ReactNode }) {
    const [checking, setChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token");

        const timer = setTimeout(() => {
            if (token) {
                router.push("/home");
            } else {
                setChecking(false);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [router]);

    if (checking) return <LoadingOverlay />;

    return <>{children}</>;
}