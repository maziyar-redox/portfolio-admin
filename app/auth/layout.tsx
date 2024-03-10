import { Logo } from "@/components/logo";

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-[url('/img/login-bg.jpg')] bg-cover bg-center " />
                    <div className="relative z-20 flex items-center text-lg font-medium m-5">
                        <Logo />
                    </div>
                    <div className="relative z-20 mt-auto m-5">
                        <blockquote className="space-y-2">
                            <p className="text-base">
                                &ldquo;Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.&rdquo;
                            </p>
                            <footer className="text-sm">
                                Friedrich Nietzsche
                            </footer>
                        </blockquote>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};