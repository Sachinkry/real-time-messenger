'use client'

import { signOut } from "next-auth/react";
import EmptyState from "../(site)/components/EmptyState";
import { DarkModeToggle } from "@/components/darkModeToggle";

const Users = () => {
    return (
        <div className="hidden md:block lg:pl-80 h-full ">
            {/* <DarkModeToggle /> */}
            <EmptyState />
        </div>
    )
}

export default Users;