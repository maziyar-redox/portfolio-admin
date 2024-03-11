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
        <aside className="h-screen border-r flex justify-start items-center flex-col gap-y-5 pt-5">
            <div className="pl-5 pr-8">
                <Logo />
            </div>
            <div className="pr-8 space-y-5">
                <ItemList
                    Data={navigation_data}
                />
            </div>
            <div className="w-full flex flex-col gap-y-4">
                <Separator />
                <span className="text-muted-foreground font-light text-sm pl-8">
                    Pages
                </span>
            </div>
            <div className="pr-8 space-y-5 w-full">
                <ItemList
                    Data={navigation_data}
                />
            </div>
            <div className="w-full">
                <Separator />
            </div>
            <div className="pr-8 space-y-5 w-full">
                <ItemList
                    Data={access_data}
                />
            </div>
        </aside>
    );
};