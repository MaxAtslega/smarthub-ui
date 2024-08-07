import React from "react";
import {Link, useLocation} from "react-router-dom";

export const NavigationBox = ({ children, to, color }: {children: React.ReactNode, to: string, color?: string}) =>  {
    const location = useLocation();

    return (
        <Link to={to} className={`h-[50px] w-[50px] flex items-center justify-center text-xl ${location.pathname.startsWith(to) ? "bg-primary-100" : `bg-background-secondary ${color ? 'text-'+color : ""}`} mb-3 last:mb-0 rounded`}>{children}</Link>
    )
}
