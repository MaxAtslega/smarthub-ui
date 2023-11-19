import { Outlet } from "react-router-dom"
import Navigator from "@/components/Navigator";
import React from "react";
import Header from "@/components/Header";

export default function Layout() {
    return (
        <>
            <Header />
            <main className={"h-[360px] mx-3"}>
                <Outlet />
            </main>
            <Navigator />
        </>
    )
}
