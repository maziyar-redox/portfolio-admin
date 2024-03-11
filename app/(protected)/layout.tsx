import { db } from "@/lib/db";

import { auth } from "@/auth";

import { Navbar } from "./_components/navbar";
import { AsideSection } from "./_components/aside";

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
            <div className="fixed top-0 left-0 right-0 flex flex-row-reverse justify-between items-start">
                <Navbar
                    firstName={userInfo?.firstName as string}
                    lastName={userInfo?.lastName as string}
                    profilePic={userInfo?.image as string}
                    role={userInfo?.role as string}
                />
                <AsideSection />
            </div>
            <div className="flex items-center justify-between mt-32 mx-60">
                {children}
            </div>
        </div>
    );
};