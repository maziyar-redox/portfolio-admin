import { ResetForm } from "@/components/auth/reset-form";

import { MainCard } from "../_components/main-card";
import { AccessButton } from "../_components/access-button";

export default function ResetPage() {
    return (
        <>
            <AccessButton
                text="Back to login ?"
                href="/auth/login"
            />
            <MainCard
                head="Reset your password"
                caption="Enter your email in field below to send an email contain a reset password link"
            >
                <ResetForm />
            </MainCard>
        </>
    );
};