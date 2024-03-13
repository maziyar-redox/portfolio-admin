import { db } from "@/lib/db";

import { auth } from "@/auth";

import { Navbar } from "./_components/navbar";
import { AsideSection } from "./_components/aside";
import { NavbarWrapper } from "./_components/navbar-wrapper";
import { CloseButton } from "./_components/close-button";
import { AsideWrapper } from "./_components/aside-wrapper";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const userInfo = await db.user.findUnique({
        where: {
            id: session?.user.id
        },
    });
    return (
        <div className="h-full w-full">
            <CloseButton />
            <NavbarWrapper>
                <Navbar
                    firstName={userInfo?.firstName as string}
                    lastName={userInfo?.lastName as string}
                    profilePic={userInfo?.image as string}
                    role={userInfo?.role as string}
                />
            </NavbarWrapper>
            <AsideWrapper>
                <AsideSection />
            </AsideWrapper>
            <div className="flex items-center justify-between mt-28 ml-5 mr-5 md:mr-8 md:ml-60">
                {children}
            </div>
        </div>
    );
};