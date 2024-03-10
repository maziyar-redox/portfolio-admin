interface MainCardProps {
    children: React.ReactNode;
    head: string;
    caption: string;
};

export function MainCard({
    children,
    head,
    caption
}: MainCardProps) {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {head}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {caption}
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
};