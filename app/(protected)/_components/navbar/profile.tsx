"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LuUserCog2 } from "react-icons/lu";
import { IoKeySharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";

import { signOut } from "next-auth/react";

import Link from "next/link";

interface ProfileProps {
    lastName: string;
    firstName: string;
    profilePic: string;
    role: string;
};

export function Profile({
    lastName,
    firstName,
    profilePic,
    role
}: ProfileProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex flex-row justify-center items-center gap-x-2">
                    <Avatar>
                        <AvatarImage src={profilePic} alt={`${firstName} ${lastName}`} />
                        <AvatarFallback>
                            {lastName.charAt(0)}
                            {firstName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col justify-center items-start">
                        <h1 className="text-white text-sm font-normal">
                            {firstName}
                            {" "}
                            {lastName}
                        </h1>
                        <span className="text-white text-xs font-light">
                            {role}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl w-48 mr-5">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/manage">
                            <LuUserCog2 className="h-5 w-5 mr-4" />
                            <span className="text-xs text-white font-normal">
                                Manage Account
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/new-password">
                            <IoKeySharp className="h-5 w-5 mr-4" />
                            <span className="text-xs text-white font-normal">
                                Change Password
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        <IoMdExit className="h-5 w-5 mr-4 text-red-600" />
                        <span className="text-xs text-white font-normal">
                            Logout
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};