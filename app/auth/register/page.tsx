import { HiOutlineExclamationTriangle } from "react-icons/hi2";

import { RegisterForm } from "@/components/auth/register-form";

import { db } from "@/lib/db";

export default async function RegisterPage() {
    const userCount = await db.user.count();
    if (userCount > 0) {
        return (
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 items-center text-center">
                        <HiOutlineExclamationTriangle className="h-20 w-20 text-red-600" />
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Oh wait!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            You can&apos;t create a new account at this moment!
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password below to create your account
                        </p>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};