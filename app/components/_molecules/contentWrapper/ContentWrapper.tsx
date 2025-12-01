"use client";

import { usePathname } from "next/navigation";

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideOn = ["/", "/sign-up"];
    const hasHeader = !hideOn.includes(pathname);

    return <div className={hasHeader ? "pt-17" : ""}>{children}</div>;
}