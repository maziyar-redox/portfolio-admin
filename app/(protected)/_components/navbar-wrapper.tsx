export function NavbarWrapper({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <div className="fixed top-0 left-0 right-0 flex flex-row-reverse justify-between items-start z-10 bg-background">
            {children}
        </div>
    );
};