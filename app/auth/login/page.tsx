import { LoginForm } from "@/components/auth/login-form";

import { MainCard } from "../_components/main-card";
import { AccessButton } from "../_components/access-button";


export default function LoginPage() {
    return (
        <>
            <AccessButton
                text="Reset your password ?"
                href="/auth/reset"
            />
            <MainCard
                head="Login to your account"
                caption="Enter your email and password below to login to your account"
            >
                <LoginForm />
            </MainCard>
        </>
    );
};