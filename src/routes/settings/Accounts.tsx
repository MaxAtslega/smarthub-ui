import {useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery} from "@/api/users.api";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "@/slices/user.slice";
import {useNavigate} from "react-router-dom";

function Accounts() {
    const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [deleteUser, {isLoading, error}] = useDeleteUserMutation();

    return (
    <div className={"bg-background-secondary h-full w-full rounded overflow-auto p-2"}>
        <div>
            <h1>Accounts</h1>
            <p>You are currently logged in with {currentUser?.username}</p>

            <div className={"mt-4"}>
                {
                    users.filter(user => user.username != currentUser?.username).map(user => (
                        <div className="mb-2 flex bg-background-third rounded px-3 py-2 items-center justify-between"
                             key={user.id}>
                            <span className={""}>{user.username}</span>
                            <div className={"flex gap-2"}>
                                <button disabled={isLoading} onClick={() => deleteUser({user})}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    )
}

export default Accounts
