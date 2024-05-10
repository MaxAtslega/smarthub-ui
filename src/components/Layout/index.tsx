import {Navigate, Outlet} from "react-router-dom"
import Navigator from "@/components/shared/Navigator";
import React from "react";
import Header from "@/components/shared/Header";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";

export default function Layout() {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser == null) {
    return <Navigate replace to="/login" />
  }

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
