import {useSelector} from "react-redux";
import {addUser, selectAllUsers, selectCurrentUser, selectUser} from "@/slices/userSlice";
import {Link, Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MdNotifications} from "react-icons/md";
import User from "@/models/User";
import {store} from "@/store";
import {BiPencil} from "react-icons/bi";

const Login = () => {
  const users = useSelector(selectAllUsers);
  const [date, setDate] = useState(new Date());
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000*20)
  })
  if (currentUser != null) {
    return <Navigate replace to="/app/dashboard" />
  }

  const handleLogin = (user: User) =>{
    store.dispatch(selectUser(user));
    navigate('/app/dashboard');
  }


  return (
    <>
      <div className={"h-[38px] w-full px-3 mb-1 pt-1"}>
        <div className={"flex justify-between items-center h-[100%]"}>
          <span
            className={"flex font-bold text-xs content-center flex-wrap"}>{date.getHours()}:{date.getMinutes()}</span>
        </div>
      </div>

      <div className={"h-[390px] pt-[50px] flex items-center flex-col"}>
        <h1 className={"content-center pb-5"}>Welcome!</h1>

        <div className={"flex justify-center"}>
          {users.map((user) => (
            <button key={user.id} onClick={() => handleLogin(user)}
                    className={"border-none bg-transparent flex justify-center items-center flex-col"}>
              <div
                className={"h-[150px] w-[150px] bg-background-secondary m-3 flex justify-center items-center rounded"}>
                <span className={"text-6xl font-bold"}>{user.username.charAt(0)}</span>
              </div>
              <span>{user.username}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={"p-3"}>
        <div className={"flex justify-end items-center"}>
          <BiPencil className={"text-2xl mr-3"}/>
          <span>Manage Users</span>
        </div>
      </div>
    </>

  )
}
export default Login