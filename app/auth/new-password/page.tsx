import { NewPassowrdForm } from "@/components/auth/new-password-form";

import { MainCard } from "../_components/main-card";
import { AccessButton } from "../_components/access-button";

export default function PasswordResetPage() {
    return (
        <>
            <AccessButton
                text="Back to login ?"
                href="/auth/login"
            />
            <MainCard
                head="Enter your new password"
                caption="Enter your new password in field below to change your password"
            >
                <NewPassowrdForm />
            </MainCard>
        </>
    );
};