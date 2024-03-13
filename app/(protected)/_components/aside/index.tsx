"use client";

import { Logo } from "@/components/logo";

import { ItemList } from "./item-list";

import { Separator } from "@/components/ui/separator";

import { BsFillPostcardFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const navigation_data = [
    {
        id: 1,
        text: "Dashboard",
        href: "/dashboard",
        icon: <IoGrid className="h-5 w-5" />
    },
    {
        id: 2,
        text: "Posts",
        href: "/dashboard/posts",
        icon: <BsFillPostcardFill className="h-5 w-5" />
    },
    {
        id: 3,
        text: "Accounts",
        href: "/dashboard/account",
        icon: <FaUserAlt className="h-5 w-5" />
    },
];

const pages_data = [
    {
        id: 1,
        text: "Inbox",
        href: "/dashboard/inbox",
        icon: <IoGrid className="h-5 w-5" />
    },
    {
        id: 2,
        text: "Posts",
        href: "/dashboard/posts",
        icon: <BsFillPostcardFill className="h-5 w-5" />
    },
    {
        id: 3,
        text: "Accounts",
        href: "/dashboard/account",
        icon: <FaUserAlt className="h-5 w-5" />
    },
];

const access_data = [
    {
        id:1,
        text: "Setting",
        href: "/dashboard/setting",
        icon: <IoSettingsOutline className="h-5 w-5" />
    }
];

export function AsideSection() {
    return (
        <aside className="h-screen border-r flex justify-start items-center flex-col gap-y-2.5 md:gap-y-5 pt-5">
            <div className="pl-5 pr-8 hidden md:block">
                <Logo />
            </div>
            <div className="pr-4 md:pr-8 pt-10 md:pt-0 space-y-2.5 md:w-full">
                <ItemList
                    Data={navigation_data}
                />
            </div>
            <div className="hidden md:flex md:w-full flex-col gap-y-2">
                <Separator />
                <span className="text-muted-foreground font-light text-sm pl-8">
                    Pages
                </span>
            </div>
            <div className="pr-4 md:pr-8 space-y-2.5 md:w-full">
                <ItemList
                    Data={pages_data}
                />
            </div>
            <div className="hidden md:block md:w-full">
                <Separator />
            </div>
            <div className="pr-4 md:pr-8 space-y-2.5 md:w-full">
                <ItemList
                    Data={access_data}
                />
            </div>
        </aside>
    );
};