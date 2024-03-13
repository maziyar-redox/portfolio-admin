import { db } from "@/lib/db";

import { auth } from "@/auth";

import { ItemWrapper } from "../_components/card";
import { AccountSetting } from "../_components/account-setting";
import { ProfilePhoto } from "../_components/profile-photo";
import { AccountDetails } from "../_components/account-details";
import { UserRole } from "@prisma/client";

export default async function ManagePage() {
    const session = await auth();
    const exitingUser = await db.user.findUnique({
        where: {
            id: session?.user.id
        },
    });
    return (
        <>
            <div className="flex flex-col justify-center items-start gap-y-5 w-full">
                <h1 className="font-semibold text-white text-2xl text-center">
                    Account management
                </h1>
                <ItemWrapper>
                    <div className="w-full space-y-5">
                        <ProfilePhoto />
                        <div className="grid grid-cols-4 gap-y-5 md:gap-y-0 md:gap-x-5">
                            <AccountSetting
                                isTwoFactorEnabled={exitingUser?.isTwoFactorEnabled as boolean}
                            />
                            <AccountDetails
                                firstName={exitingUser?.firstName as string}
                                lastName={exitingUser?.lastName as string}
                                email={exitingUser?.email as string}
                                role={exitingUser?.role as UserRole}
                            />
                        </div>
                    </div>
                </ItemWrapper>
            </div>
        </>
    );
};