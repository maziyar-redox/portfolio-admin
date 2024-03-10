import { MainCard } from "../_components/main-card";
import { ErrorMessage } from "../_components/error";
import { AccessButton } from "../_components/access-button";

import { RegisterForm } from "@/components/auth/register-form";

import { db } from "@/lib/db";

export default async function RegisterPage() {
    const userCount = await db.user.count();
    if (userCount > 0) {
        return (
            <>
                <ErrorMessage
                    message="You can't create a new account at this moment!"
                />
            </>
        );
    };
    return (
        <>
            <AccessButton
                text="Back to login ?"
                href="/auth/login"
            />
            <MainCard
                head="Create an account"
                caption="Enter your email and password below to create your account"
            >
                <RegisterForm />
            </MainCard>
        </>
    );
};