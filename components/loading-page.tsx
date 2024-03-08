import "@/components/css/style.css";

export function LoadingState() {
    return (
        <>
            <div className="flex flex-col h-screen items-center justify-center">
                <div className="hexagon" aria-label="Animated hexagonal ripples">
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                    <div className="hexagon__group">
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                        <div className="hexagon__sector" />
                    </div>
                </div>
                <p aria-label="Loading" className="font-normal">Loading...</p>
            </div>
        </>
    );
};