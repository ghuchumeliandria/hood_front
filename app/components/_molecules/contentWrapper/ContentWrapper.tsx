"use client";

import { usePathname } from "next/navigation";

export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideOn = ["/", "/sign-up"];
    const hasHeader = !hideOn.includes(pathname);

    return <div className={hasHeader ? "pt-17 px-10 bg-[#fff7ef] min-h-screen" : ""}>{children}</div>;
}