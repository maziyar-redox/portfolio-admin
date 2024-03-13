"use client";

import { Profile } from "./profile";

interface NavbarProps {
    lastName: string;
    firstName: string;
    profilePic: string;
    role: string;
};

export function Navbar({
    lastName,
    firstName,
    profilePic,
    role,
}: NavbarProps) {
    return (
        <>
            <nav className="flex flex-row-reverse items-center w-full justify-between py-5 pl-8 pr-5 md:pr-10 border-b">
                <Profile
                    lastName={lastName}
                    firstName={firstName}
                    profilePic={profilePic}
                    role={role}
                />
            </nav>
        </>
    );
};