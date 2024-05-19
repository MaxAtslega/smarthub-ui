import {useSelector} from "react-redux";
import {addUser, selectAllUsers, selectCurrentUser, selectUser} from "@/slices/user.slice";
import {Link, Navigate, redirect, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MdNotifications} from "react-icons/md";
import User from "@/models/User";
import {store} from "@/store";
import {BiPencil} from "react-icons/bi";
import {useGetUsersQuery} from "@/api/users.api";
import {IoMdAdd} from "react-icons/io";

const Login = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

  const [date, setDate] = useState(new Date());
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000 * 20);
    return () => clearInterval(intervalId);
  }, []);

  if (currentUser != null) {
    return <Navigate replace to="/app/dashboard" />
  }

  const handleLogin = (user: User) =>{
    store.dispatch(selectUser(user));
    navigate('/app/dashboard');
  }


  return (
    <div className={"flex flex-col relative h-[480px]"}>
      <div className={"h-[38px] w-full px-3 mb-1 pt-1"}>
        <div className={"flex justify-between items-center h-[100%]"}>
          <span
            className={"flex font-bold text-xs content-center flex-wrap"}>{date.getHours()}:{date.getMinutes()}</span>
        </div>
      </div>

      <div className={"h-full pt-[50px] flex flex-col items-center"}>
        <h1 className={"content-center pb-5"}>Welcome!</h1>
        <div style={{ scrollbarWidth: "none" }} className={"pl-8 flex w-full overflow-x-auto " + (users.length < 5 ? "justify-center" : "justify-start")}>
          {users.map((user: User) => (
              <div key={user.id} onClick={() => handleLogin(user)}
                    className={"pr-8 border-none bg-transparent flex justify-center items-center flex-col cursor-pointer"}>
              <div className={"h-[150px] w-[150px] bg-background-secondary flex justify-center items-center rounded"}>
                <span className={"text-6xl font-bold"}>{user.username.charAt(0)}</span>
              </div>
              <span className={"font-medium"}>{user.username}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={"flex p-4 items-end justify-end"}>
        <Link to={"/create-profile"} className={"bg-background-secondary py-2 px-4 flex align-middle rounded cursor-pointer"}>
          <IoMdAdd  className={"text-2xl mr-3"}/>
          <span>Create Profile</span>
        </Link>
      </div>
    </div>
  )
}
export default Login