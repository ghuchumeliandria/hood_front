"use client";

import { usePathname } from "next/navigation";
import Header from "../header/Header";

export default function ConditionalHeader() {
    const pathname = usePathname();

    const hideOn = ["/", "/sign-up"]; 

    if (hideOn.includes(pathname)) return null;

    return <Header />;
}