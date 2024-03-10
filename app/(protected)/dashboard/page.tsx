import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit">signout</button>
            </form>
        </div>
    );
};